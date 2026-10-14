# Stale file / env-backup cleanup (2026-10-14)

Repo: `/home/jos.idprofitsol.com/tribin` (staging), branch
`feature/cg-transfer-barcode-register`, base HEAD `2f07fc785`.

Task: remove the stale-file candidates below **only after confirming each is
genuinely unused**, recording the verification for each, and flagging (not
deleting) anything referenced or ambiguous.

Note on this commit: every file removed below was **untracked or gitignored**
(`git ls-files` returned empty for all of them), so their deletion produces no
git diff. This document is therefore the durable record of the change.

## Verification method (run over the whole repo)

```
grep -rIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.yarn \
  --exclude-dir=vendor \
  -e 'bak-bcroute' -e 'bak-broadcast' -e 'env\.orig' -e 'assets\.zip' .
```

plus per-file: `diff` against the live counterpart, `git ls-files` /
`git check-ignore`, mtime ordering, and unique-symbol checks (routes, controller
functions, env KEY names) between each backup and its live file.

## Removed (confirmed unused)

| File | Size | Reference check | Unique content vs live file |
|---|---|---|---|
| `app/Http/Controllers/InvoiceController.php.bak-bcroute` | 99959 B | grep for `bak-bcroute`: no hits in app/routes/config/views; not tracked; not ignored (plain untracked) | 66 `function` defs vs 71 live; **no function name exists only in the backup** (`comm -23` empty) — strict subset |
| `routes/web.php.bak-bcroute` | 41315 B | grep for `bak-bcroute`: no hits; not tracked | 436 `Route::` lines vs 499 live. Only-in-backup URIs: `getHREmployee`, `viewStockByItemLoc/{item}/{loc?}` — **both still live** in `routes/web.php` (lines 772 and 570), the live ones simply generalized (`Route::match([...])`, added `{doc?}`) |
| `.env.bak-broadcast` | 1662 B | grep for `bak-broadcast`: only `.gitignore:21` (a comment); not tracked; **gitignored** by `.env.*` (`.gitignore:24`) | no env KEY exists only in backups (`comm -23` empty) |
| `.env.bak.broadcast.1791335831` | 1749 B | matched by `--exclude` glob `.env.bak.broadcast.*`; gitignored by `.env.*` | same KEY set as live |
| `.env.orig` | 1740 B | grep for `env.orig`: only `.gitignore:21` (a comment); gitignored by `.env.*` | same KEY set as live |

All five were **older than their live counterparts** (backups 2026-10-05/08,
live files 2026-10-07/14) and all `diff`ed from the live file, i.e. they were
superseded snapshots, not the loaded file. SHA-256 of each deleted file is
recorded in the task workspace (`deleted.sha256.txt`) for provenance.

`.env` and `.env.example` are untouched and still present.

## Left in place (flagged, NOT deleted)

### 1. `public/assets.zip` — path does not exist; the real file is elsewhere

The candidate `public/assets.zip` **does not exist**. The file that exists is
`public/assets/assets.zip` (7.9 MB, 2026-10-08, untracked). It was **not
deleted**, for two reasons:

- `grep -n 'assets.zip' public/mix-manifest.json` → line 683:
  `/assets/assets.zip`. It is listed in the working-tree mix manifest (it is
  **absent** from the committed `HEAD:public/mix-manifest.json`, so this entry
  is local build residue). No `mix()` call or Blade view references that key
  (`grep` over `resources/`, `app/`, `routes/`, `config/` → no hits), so nothing
  loads it — but the manifest entry makes it "ambiguous" per the task rule.
- It is a zip of already-extracted vendor assets (`alertify/`, `bootstrap/`,
  `select2/`, ... — every top-level dir it contains is already present under
  `public/assets/`), i.e. a redundant 7.9 MB duplicate.

Recommendation: safe to delete once the owner confirms the `mix-manifest.json`
entry is residue; I left it rather than delete on my own judgement.
**Decision for the owner.**

### 2. `.env.bak-broadcast` still present in the git object store (leak check)

Before deletion the blob existed in the local object DB
(blob `5c58af86456d382778e34018e9bd8b9993d22dd4`) via dangling WIP/stash commits
(`f84d546b7 untracked files on New-Invoice…`, reachable only from
`refs/stash` and `refs/prod-backup/stash`). Checked whether it ever reached the
public remote (`origin https://github.com/denyrachmat/tribin.git`):

```
git log --oneline --branches --remotes --find-object=5c58af8…   # no hits
```

So the blob is **local-only (stash refs), never pushed**. No push of this change
was made (per task). If those stash refs are ever `git push --all`/mirrored, the
credentials inside become shared — worth dropping the stale stash eventually,
but that is out of scope here.

## SECURITY NOTE — `.env.orig` (owner action)

`.env.orig` was a **stray real environment file** holding `APP_KEY`,
`DB_PASSWORD`, AWS and Pusher credentials (per the `.gitignore:20-24` comment).
It is now deleted from the working tree.

The OpenLiteSpeed vhost for this site has `docRoot $VH_ROOT/tribin/public`
(`/usr/local/lsws/conf/vhosts/jos.idprofitsol.com/vhost.conf`), so `.env.*` sit
**one level above the document root** and were not directly URL-served. They were
gitignored by `.env.*` (`.gitignore:24`), so they were never committed and are
not on the public GitHub repo. The exposure risk that remains is only if a
docroot is ever changed to the repo root (or a static file server is pointed at
it): a stray env file there leaks the full credential set. Confirmed deleted;
recommend the owner also confirm no other stray env copies exist outside the
repo (deploy artefacts, `/tmp`, backups).

## Neighbour health after change

- `php artisan --version` → `Laravel Framework 10.16.0` (OK)
- `.env` and `.env.example` intact; no runtime file touched; no reload needed.
- `git status --porcelain` count before this task's deletions: 352; after: 350
  (the two untracked `.bak-bcroute` files removed). Env backups were already
  gitignored so they never showed.
