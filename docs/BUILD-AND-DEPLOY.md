# Build & deploy — Tribin (staging)

Audience: anyone who has to produce a deployable build on this box.
Scope: the staging checkout at `/home/jos.idprofitsol.com/tribin`.
Everything below is staging-only; production is built the same way but is a
separate host and a separate decision.

---

## What changed, and why this doc exists

Three things in the build path were wrong or undocumented. Fixed on the staging
branch (`feature/cg-transfer-barcode-register`), not pushed:

| Commit | Change |
|---|---|
| `8580a9f09` | **yarn is now the single authoritative package manager.** `yarn.lock` is the only tracked lockfile. Added the `build:staging` script. |
| `82d2959c7` | **`npx mix` can no longer wipe non-asset files under `public/`.** `webpack.mix.js` rewritten from "glob everything, exclude a few" to an explicit inclusion allow-list. |
| (this doc) | The working sequence, the two traps that break it, and the workspace layout. |

Why it mattered:

1. The documented build command did not work at all on this box — yarn was not
   installed, and plain `npm install` fails on a vite peer conflict. Four
   lockfiles were tracked at once, so "install from the repo" had no single
   meaning. Now there is one lockfile and one install command.
2. `webpack.mix.js` cleaned `public/**/*`, excluding only `fonts` and
   `images`. In this checkout the pattern was inert (see below) — but the same
   pattern would delete `public/.well-known` (ACME challenges),
   `public/storage`, `public/index.php`, `public/admin_assets/**` and the
   customer uploads under `public/attachments/**` the moment the working
   directory it resolved against ever moved. It now cannot match those paths
   at all.

The old "just run the build" instructions are gone. Follow this doc.

---

## The working sequence (copy-paste)

```bash
# 1. Toolchain: put node 18 first on PATH. THIS LINE IS NOT OPTIONAL.
export PATH=/home/jos.idprofitsol.com/node18/bin:$PATH

# 2. From the repo root (NOT from tribinapp/):
cd /home/jos.idprofitsol.com/tribin

# 3. Install exactly what yarn.lock pins.
yarn install --immutable

# 4. Build the SPA for the STAGING api/web URLs.
yarn run build:staging
```

That is the whole build. The "deploy" on staging is that this last step copies
the built SPA into `public/` — there is no separate ship step on this host
(the web server's document root is `public/`).

Verified outputs after step 4:

| Path | What it is |
|---|---|
| `tribinapp/dist/spa/` | Raw Quasar build output. |
| `public/index.html`, `public/assets/index-*.{js,css}` | SPA copied into the web root. |
| `resources/views/tribinapp.blade.php` | Blade view served at `/tribinapp` (gitignored, generated). |

### Required flags and why

- **`--immutable`** — yarn refuses to run if the install would modify
  `yarn.lock`. That is the point: a build that silently re-resolves dependencies
  is not reproducible. If this errors, the lockfile and `package.json` disagree
  and that is a change to review, not to paper over with a plain `yarn install`.

- **`build:staging`, not `build`** — this is the one that bites silently.
  `tribinapp/quasar.config.js` maps `TRIBIN_ENV` to the API URL and **defaults
  to production when the variable is unset**. Plain `yarn run build` on the
  staging box bakes `https://jos.jatpowerindo.co.id/api/` into the SPA. The
  `build:staging` script (`TRIBIN_ENV=staging yarn run build`) is what makes a
  staging build actually staging. Check it if you ever doubt a build:

  ```bash
  grep -rl jos.idprofitsol.com tribinapp/dist/spa/assets | wc -l   # expect > 0
  grep -rl jos.jatpowerindo.co.id tribinapp/dist/spa/assets | wc -l # expect 0
  ```

- **The `export PATH` line** — the default `node` on this box is
  `/usr/bin/node` **v12.22.9**. The yarn on this box is a corepack shim, and
  under node 12 it fails immediately with a syntax error (`??=`). Yarn is also
  not on the default PATH; it lives at `/home/jos.idprofitsol.com/node18/bin/yarn`
  (yarn 3.6.1, pinned by `packageManager` in the root `package.json`). Node 18
  works because `tribinapp/package.json` allows `^18`, and it is the interpreter
  the existing `node_modules` tree was installed with.

### Order matters

`yarn install` **must** run before the build. Running the build on a checkout
with no `node_modules` fails with:

```
Usage Error: Couldn't find the node_modules state file - running an install
might help (findPackageLocation)
```

That is yarn behaving correctly, not a broken script. The sequence above is in
the right order.

---

## Workspace layout — where installs actually land

This surprises people, so read it before hunting for a missing `node_modules`.

- The **root** `package.json` declares `"workspaces": ["packages/*", "tribinapp"]`.
- `.yarnrc.yml` sets `nodeLinker: node-modules`.

Consequences:

- **`yarn install` installs into the REPO ROOT `node_modules/`**, not into
  `tribinapp/node_modules/`. The tree is flat/hoisted (~800 top-level entries);
  `vite`, `laravel-mix`, `quasar` and `@quasar` all sit in the root
  `node_modules/`, and the binaries are in the root `node_modules/.bin/`.
- **`tribinapp/node_modules/` does not exist and is not supposed to.** The
  workspace member is linked instead: `node_modules/tribinapp -> ../tribinapp`.
- Therefore **run yarn from the repo root.** Running `yarn` inside `tribinapp/`
  operates on the same workspace root and writes the same root `node_modules/`.
  There is nothing to find under `tribinapp/node_modules`, so do not go looking.

---

## `npx mix` — what it does now, and the landmine that was removed

`npx mix` is the last step of the `build` script. On this project it is a
**copy** step, not a compiler: `webpack.mix.js` ends in

```js
mix.copy('tribinapp/dist/spa/index.html', 'resources/views/tribinapp.blade.php')
    .copyDirectory('tribinapp/dist/spa', 'public');
```

There are **zero** `mix()` asset-compilation calls anywhere in `app/`,
`routes/` or `resources/views/`.

### The old configuration was a landmine, not a working clean

`CleanWebpackPlugin` runs `del(patterns, { cwd: <webpack output.path> })`, and
laravel-mix sets `output.path` to the project's `public/` directory whenever an
`artisan` file exists next to the config. So patterns resolved **relative to
`public/`**, and the old config's `public/**/*` became `public/public/**/*` —
which matched **zero files**. The `!public/fonts` and `!public/images`
exclusions were inert for the same reason.

Measured on this checkout: the clean deleted nothing, and had never deleted
anything. That is why it "worked". The danger was the same pattern evaluated at
a repo-root working directory — there it matches ~2934 files, including
`.well-known`, `storage`, `attachments`, `index.php`, `.htaccess` and committed
vendor libraries. A defensive fix, in other words; the bug was dormant, not
active. (`npx mix` looking destructive in an earlier report was a fresh checkout
compared against a box where `public/.well-known` existed — that directory has
never been tracked in git.)

### What the fix does

The clean is now an **explicit inclusion allow-list** scoped to the top level of
`public/assets/`:

```
assets/*.{js,css,map,woff,woff2,ttf,eot,svg,png,jpg,jpeg,gif,ico}
```

Design choice, deliberately: exclusions fail *open* (one missing `!` destroys
committed files), an inclusion list fails *closed* (a missing line at worst
leaves one stale hashed chunk behind, and `index.html` — not the chunk list —
decides what is served). By construction these patterns cannot reach
`public/.well-known/**`, `public/storage`, `public/index.php`,
`public/.htaccess`, `public/attachments/**`, `public/admin_assets/**`, or the
committed vendor libraries under `public/assets/<name>/` (all of which live in
*sub*directories, which the top-level `assets/*.ext` glob does not traverse).

`public/storage` is a real directory in HEAD, not a tracked symlink; the
clean would not follow a symlink even if it were one (`del`/`rimraf` unlink a
symlink, they never traverse it).

### Should I use `cp -a` instead of `npx mix`?

Both work now. The trade-off:

```bash
# equivalent copy, no plugin involved:
cp -a tribinapp/dist/spa/. public/
```

`cp -a` does **not** remove the previous build's hashed chunks, so stale
`public/assets/index-*.js` files accumulate; `npx mix` does remove them, but
only top-level `public/assets/` chunk files, and only those. Prefer
`npx mix` (i.e. the documented `yarn run build:staging`) for that reason. Use
`cp -a` only if the mix step itself is broken — it is a strictly worse but
always-safe fallback.

---

## Known caveats (do not assume these away)

- **The first install needs network access.** `yarn install --immutable`
  fetched ~1600 packages in testing (yarn `YN0013`). The committed
  `.yarn/cache` is not a complete offline set, so a genuinely offline box will
  still fail.
- **`yarn install` rewrites `.yarn/cache`.** It prunes entries the lockfile no
  longer references (in testing: ~321 tracked zips removed, ~322 added). Do
  not "fix" that by committing the churn.
- **Never `chmod` a corepack shim.** `node18/bin/yarn` is a symlink into
  `node18/lib/node_modules/corepack/dist/`; a `chmod` on the shim propagates to
  the real file and breaks yarn. Remove the symlink to disable a shim.
- **A fresh checkout serves a broken SPA at `/` until you build.** The
  committed `public/index.html` references `assets/index-*.{js,css}` files that
  are gitignored and therefore absent from a clean checkout. Pre-existing and
  out of scope here; running the build (step 4) fixes it because the generated
  chunks land next to it.
- **The build dirties tracked generated files.** `public/index.html`,
  `public/mix-manifest.json` and the gitignored
  `resources/views/tribinapp.blade.php` are build outputs. Expect them to
  change; do not hand-edit them.
- The quasar build prints `Error when using sourcemap for reporting an error`
  for `itemRequestIndex.vue` and still reports `Build succeeded`. Pre-existing
  and harmless.

---

## Rollback

```bash
git -C /home/jos.idprofitsol.com/tribin revert --no-edit 8580a9f09  # lockfile policy + build:staging
git -C /home/jos.idprofitsol.com/tribin revert --no-edit 82d2959c7  # webpack.mix.js allow-list
```

The pre-change lockfiles and a sha256 list are kept in the workspace backup
referenced by the build-reproducibility report.
