#!/usr/bin/env python3
"""
Save V_SALES_REPORT deterministically and generate V_SALES_REPORT_TMP.

Two view shapes exist in this deployment:

  A) "plain"  - jatpt, jatcv, retail: a single SELECT with fully-qualified
                `schema`.`table`.`column` names. Branch-capable: T_SLOHEAD is
                joined and carries TSLO_BRANCH.
  B) "union"  - service: a 3-way UNION ALL over SLO / service-order / POS.
                POS tables (T_POS, T_POS_DET) have no branch column at all, so a
                branch filter cannot exist consistently -> no _TMP is generated.

_TMP for shape A applies exactly ONE change, asserted before/after:
  * SELECT + GROUP BY : add `T_SLOHEAD`.`TSLO_BRANCH` (enables branch filtering)
Deliberately NOT changed, to keep output provably identical to V_SALES_REPORT
(so "monthly report == manual range report" can be verified byte-for-byte):
  - SLODET_DATE stays the raw `T_SLODETA`.`created_at` (NOT min()): wrapping it in
    min() would change which month a line lands in, silently dropping lines whose
    earliest date sits outside the requested month.
  - the existing GROUP BY grain is kept as-is. Dropping TDLVORDDETA_ITMQT/PRC is a
    separate performance change; it does not alter per-category totals, but it does
    alter how many rows the PDF prints, so it belongs to the perf sprint, not here.
"""
import os
import re
import subprocess

REPO = "/home/jos.idprofitsol.com/tribin"
OUTDIR = os.path.join(REPO, "database", "views")
ENV = os.path.join(REPO, ".env")
PLAIN = ["jatpower_jos_jatpt", "jatpower_jos_jatcv", "jatpower_jos_retail"]
UNION_VIEWS = ["jatpower_jos_service"]


def env(key):
    with open(ENV) as fh:
        for line in fh:
            if line.startswith(key + "="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("missing " + key)


PWD, USER = env("DB_PASSWORD"), env("DB_USERNAME")


def mysql(sql):
    r = subprocess.run(
        ["mysql", "-h", "127.0.0.1", "-u", USER, "-N", "-B", "-e", sql],
        capture_output=True, text=True, env=dict(os.environ, MYSQL_PWD=PWD),
    )
    if r.returncode != 0:
        raise SystemExit("mysql failed: " + r.stderr.strip())
    return r.stdout


def definition(schema):
    out = mysql(
        "SELECT VIEW_DEFINITION FROM information_schema.VIEWS "
        f"WHERE TABLE_SCHEMA='{schema}' AND TABLE_NAME='V_SALES_REPORT'"
    ).strip()
    return re.sub(r"\\n$", "", out)  # strip the trailing escaped newline


def must_sub(text, pattern, repl, label):
    """Apply exactly one substitution; fail loudly if the pattern is absent or ambiguous."""
    rx = re.compile(pattern)
    found = rx.findall(text)
    if len(found) != 1:
        raise SystemExit(f"ASSERT FAILED [{label}]: expected 1 match, got {len(found)} of {pattern!r}")
    return rx.sub(repl, text, count=1)


def build_tmp(schema, body):
    """Add TSLO_BRANCH to SELECT and GROUP BY. Nothing else is touched."""
    changed = []

    body = must_sub(
        body,
        rf"(`{re.escape(schema)}`\.`T_SLOHEAD`\.`TSLO_SLOCD` AS `TSLO_SLOCD`)",
        r"\1," + f"`{schema}`.`T_SLOHEAD`.`TSLO_BRANCH` AS `TSLO_BRANCH`",
        "1/SELECT add TSLO_BRANCH",
    )
    changed.append("SELECT+TSLO_BRANCH")

    body = must_sub(
        body,
        rf"(group by `{re.escape(schema)}`\.`T_SLOHEAD`\.`TSLO_SLOCD`)",
        r"\1," + f"`{schema}`.`T_SLOHEAD`.`TSLO_BRANCH`",
        "2/GROUP BY add TSLO_BRANCH",
    )
    changed.append("GROUP BY+TSLO_BRANCH")
    return body, changed


os.makedirs(OUTDIR, exist_ok=True)
report = []

# ---------- backups (all schemas, verbatim) ----------
for schema in PLAIN + UNION_VIEWS:
    body = definition(schema)
    path = os.path.join(OUTDIR, f"V_SALES_REPORT.{schema}.sql")
    with open(path, "w") as fh:
        fh.write(
            f"-- Verbatim backup of {schema}.V_SALES_REPORT (staging)\n"
            f"-- Restore:\n--   DROP VIEW IF EXISTS `{schema}`.`V_SALES_REPORT`;\n"
            f"--   run the CREATE below.\n"
            f"CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `{schema}`.`V_SALES_REPORT` AS\n{body};\n"
        )
    report.append((schema, "backup", len(body), "ok"))

# ---------- _TMP for branch-capable schemas ----------
for schema in PLAIN:
    body, changed = build_tmp(schema, definition(schema))
    path = os.path.join(OUTDIR, f"V_SALES_REPORT_TMP.{schema}.sql")
    with open(path, "w") as fh:
        fh.write(
            f"-- V_SALES_REPORT_TMP for {schema}\n"
            "-- Generated from V_SALES_REPORT.<schema>.sql by build_tmp_view.py:\n"
            "--   "
            "--   TSLO_BRANCH added to SELECT and GROUP BY (branch filter). Only change.\n"
            f"DROP VIEW IF EXISTS `{schema}`.`V_SALES_REPORT_TMP`;\n"
            f"CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `{schema}`.`V_SALES_REPORT_TMP` AS\n{body};\n"
        )
    report.append((schema, "_TMP", len(body), ",".join(changed)))

# ---------- service: deliberately no _TMP ----------
for schema in UNION_VIEWS:
    report.append((schema, "_TMP SKIPPED", 0, "union view, POS legs have no branch column"))

print(f"output dir: {OUTDIR}")
for schema, what, n, note in report:
    print(f"  {schema:24s} {what:12s} {n:6d}  {note}")

print("\nfiles written:")
for name in sorted(os.listdir(OUTDIR)):
    print("  ", name)
