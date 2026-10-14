#!/usr/bin/env python3
"""
Verify that each V_SALES_REPORT_TMP.<schema>.sql differs from the verbatim
V_SALES_REPORT.<schema>.sql by EXACTLY two additions (both TSLO_BRANCH: one in the
SELECT list, one in the GROUP BY) and nothing else.

Exit code 0 = all good. Any other exit = do not apply.
"""
import os
import sys

DIR = os.path.dirname(os.path.abspath(__file__))
SCHEMAS = ["jatpower_jos_jatpt", "jatpower_jos_jatcv", "jatpower_jos_retail"]


def body(path, view):
    text = open(path).read()
    marker = f"VIEW `{view}` AS"
    if marker not in text:
        raise SystemExit(f"marker not found in {path}: {marker}")
    return text.split(marker, 1)[1].strip().rstrip(";").strip()


ok = True
for s in SCHEMAS:
    orig = body(os.path.join(DIR, f"V_SALES_REPORT.{s}.sql"), f"{s}`.`V_SALES_REPORT")
    tmp = body(os.path.join(DIR, f"V_SALES_REPORT_TMP.{s}.sql"), f"{s}`.`V_SALES_REPORT_TMP")

    sel = f",`{s}`.`T_SLOHEAD`.`TSLO_BRANCH` AS `TSLO_BRANCH`"
    grp = f",`{s}`.`T_SLOHEAD`.`TSLO_BRANCH`"

    checks = []

    checks.append(("select addition present exactly once", tmp.count(sel) == 1))
    without_sel = tmp.replace(sel, "", 1)
    checks.append(("group-by addition present exactly once (outside the SELECT item)",
                   without_sel.count(grp) == 1))
    checks.append(("no min() rewrite", "min(`%s`.`T_SLODETA`.`created_at`)" % s not in tmp))
    checks.append(("group-by grain preserved",
                   all(x in tmp for x in [f"`{s}`.`T_SLODETA`.`created_at`",
                                          f"`{s}`.`T_DLVORDDETA`.`TDLVORDDETA_ITMQT`",
                                          f"`{s}`.`T_DLVORDDETA`.`TDLVORDDETA_PRC`"])))

    reverted = tmp.replace(sel, "", 1).replace(grp, "", 1)
    checks.append(("differs ONLY by the two additions", reverted == orig))

    print(f"=== {s} ===")
    for name, passed in checks:
        print(f"   [{'PASS' if passed else 'FAIL'}] {name}")
        ok = ok and passed
    if reverted != orig:
        import difflib
        for line in list(difflib.unified_diff(orig.split(","), reverted.split(","), lineterm=""))[:12]:
            print("        ", line[:130])

print("\nRESULT:", "ALL CHECKS PASSED" if ok else "FAILURES PRESENT - DO NOT APPLY")
sys.exit(0 if ok else 1)
