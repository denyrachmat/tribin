#!/usr/bin/env python3
"""
Rebuild jatpower_jos_service.V_SALES_REPORT_TMP from the verbatim backup, applying
BOTH changes in one pass so there is no intermediate file to chain:

  1. TSLODETA_ITMQT carries qty * price (an amount) in every UNION leg, matching
     jatpt/jatcv/retail. Without this the report prints "Rp 1" for service, because
     the view aliased the column to a bare quantity.

  2. TSLO_BRANCH is added to the SELECT list and GROUP BY of every leg so the report
     can show a Cabang column and filter by branch. Source per leg:
        leg 1 (SLO)           -> `sh`.`TSLO_BRANCH`   (sh aliases T_SLOHEAD)
        leg 2 (service order) -> `sh`.`SRVH_BRANCH`   (sh aliases T_SRV_HEAD)
        leg 3 (POS)           -> `u`.`branch`          (T_POS has no branch column;
                                                        this is the creating user's
                                                        branch, and that leg already
                                                        joins users)

The QTY column is left alone; it stays the raw quantity.

Staging and prod are generated separately because the two engines spell the view
differently (isnull(x) on MySQL 5.7 vs x is null on MariaDB).
"""
import os
import re

REPO = "/home/jos.idprofitsol.com/tribin"
OUTDIR = os.path.join(REPO, "database", "views")
PROD_DIR = "/home/profitsol/.hermes/cache/scratch/prod_views"
SCHEMA = "jatpower_jos_service"

# branch expression per leg, in leg order
BRANCH_EXPRS = ["`sh`.`TSLO_BRANCH`", "`sh`.`SRVH_BRANCH`", "`u`.`branch`"]


def item_before(text, alias_pos):
    """Start index of the select item whose AS clause ends at alias_pos."""
    depth = 0
    in_tick = False
    i = alias_pos - 1
    while i >= 0:
        ch = text[i]
        if ch == "`":
            in_tick = not in_tick
        elif not in_tick:
            if ch == ")":
                depth += 1
            elif ch == "(":
                depth -= 1
            elif ch == "," and depth == 0:
                return i + 1
        i -= 1
    return 0


def expression_for(text, alias):
    m = re.search(rf"\s+AS\s+`{re.escape(alias)}`", text)
    if not m:
        return None
    return text[item_before(text, m.start()):m.start()].strip()


def top_level_from(leg):
    """Index of the ' from ' ending the select list (paren-depth aware)."""
    start = leg.lower().find("select")
    depth = 0
    j = start
    while j < len(leg):
        c = leg[j]
        if c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
        elif depth == 0 and leg[j:j + 6].lower() == " from ":
            return j
        j += 1
    raise SystemExit("no top-level FROM found")


def apply_leg(leg, branch, label, leg_no):
    """Apply both changes to one UNION leg."""

    # ---- change 1: TSLODETA_ITMQT becomes the amount -------------------------
    amount = expression_for(leg, "TOTAL")
    if amount is None:
        raise SystemExit(f"{label}: leg {leg_no} has no TOTAL expression")
    m = re.search(r"\s+AS\s+`TSLODETA_ITMQT`", leg)
    if not m:
        raise SystemExit(f"{label}: leg {leg_no} has no TSLODETA_ITMQT")
    start = item_before(leg, m.start())
    leg = leg[:start] + amount + leg[m.start():]

    # ---- change 2: TSLO_BRANCH in SELECT ------------------------------------
    frm = top_level_from(leg)
    before, after = leg[:frm], leg[frm:]
    leg = before + f",{branch} AS `TSLO_BRANCH`" + after

    # ---- change 2b: TSLO_BRANCH in GROUP BY ---------------------------------
    # Inserted as the FIRST group-by item ("group by <branch>,<rest>") rather than
    # appended, because appending needs to find the end of the list (which stops at
    # the next UNION or the end of the statement) and gets the spacing wrong.
    gbs = [mm.start() for mm in re.finditer(r"group by\s", leg, re.I)]
    if not gbs:
        raise SystemExit(f"{label}: leg {leg_no} has no GROUP BY")
    gb = gbs[-1]
    after_kw = gb + len("group by ")
    leg = leg[:after_kw] + f"{branch}," + leg[after_kw:]

    # ---- sanity: the rendered fragment must be valid-looking SQL -------------
    frag = leg[gb:gb + 60]
    if not re.match(r"group by [`a-z]", frag, re.I):
        raise SystemExit(f"{label}: leg {leg_no} malformed GROUP BY: {frag!r}")

    return leg


def process(src_path, label, out_name):
    text = open(src_path).read()
    marker = f"VIEW `{SCHEMA}`.`V_SALES_REPORT` AS"
    if marker not in text:
        raise SystemExit(f"marker not found in {src_path}")
    body = text.split(marker, 1)[1].strip().rstrip(";").strip()

    parts = re.split(r"(?i)(union all)", body)
    if sum(1 for p in parts if p.lower().strip() == "union all") + 1 != 3:
        raise SystemExit(f"{label}: expected 3 union legs")

    new_parts, leg_no, report = [], 0, []
    for part in parts:
        if part.lower().strip() == "union all":
            new_parts.append(part)
            continue
        leg_no += 1
        branch = BRANCH_EXPRS[leg_no - 1]
        new_parts.append(apply_leg(part, branch, label, leg_no))
        report.append((leg_no, branch))

    new_body = "".join(new_parts)

    # ---- assertions ---------------------------------------------------------
    assert new_body.count("AS `TSLO_BRANCH`") == 3, f"{label}: need 3 TSLO_BRANCH aliases"
    # alias delta, because subqueries in the view also carry aliases
    delta = len(re.findall(r"AS\s+`[A-Z_0-9]+`", new_body)) - len(re.findall(r"AS\s+`[A-Z_0-9]+`", body))
    assert delta == 3, f"{label}: alias delta {delta}, expected 3"
    # money fix applied in every leg
    for i, leg in enumerate(re.split(r"(?i)union all", new_body), 1):
        expr = expression_for(leg, "TSLODETA_ITMQT")
        assert expr and ("*" in expr), f"{label}: leg {i} TSLODETA_ITMQT not an amount: {expr}"
    # no branch expression lost
    for _, br in report:
        assert br in new_body, f"{label}: missing {br}"

    out = os.path.join(OUTDIR, out_name)
    with open(out, "w") as fh:
        fh.write(
            f"-- V_SALES_REPORT_TMP for {SCHEMA}{label}\n"
            "-- Generated by build_service_branch_view.py from the verbatim backup.\n"
            "-- Changes vs V_SALES_REPORT:\n"
            "--   1. TSLODETA_ITMQT is an amount (qty * price) in all three legs, so the\n"
            "--      report prints rupiah instead of 'Rp 1'.\n"
            "--   2. TSLO_BRANCH added to SELECT and GROUP BY, so the report can show a\n"
            "--      Cabang column and filter by branch. Sources: SLO -> TSLO_BRANCH;\n"
            "--      service order -> SRVH_BRANCH; POS -> users.branch.\n"
            "--   QTY is untouched (still the raw quantity).\n"
            f"DROP VIEW IF EXISTS `{SCHEMA}`.`V_SALES_REPORT_TMP`;\n"
            f"CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `{SCHEMA}`.`V_SALES_REPORT_TMP` AS\n{new_body};\n"
        )
    print(f"{label or '(staging)'} -> {out_name}")
    for i, br in report:
        print(f"    leg {i}: money=amount, branch={br}")
    return out


process(os.path.join(OUTDIR, f"V_SALES_REPORT.{SCHEMA}.sql"), "", f"V_SALES_REPORT_TMP.{SCHEMA}.sql")
prod = os.path.join(PROD_DIR, f"V_SALES_REPORT.{SCHEMA}.PROD.sql")
if os.path.exists(prod):
    process(prod, ".PROD", f"V_SALES_REPORT_TMP.{SCHEMA}.PROD.sql")
