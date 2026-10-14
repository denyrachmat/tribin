let mix = require('laravel-mix');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// ---------------------------------------------------------------------------
// Clean ONLY the generated SPA bundles before each build.
//
// READ THIS BEFORE CHANGING THE PATTERNS.
//
// CleanWebpackPlugin calls `del(patterns, { cwd: <webpack output.path> })`, and
// laravel-mix sets output.path to the project's public directory whenever an
// `artisan` file exists next to this config. So `cwd` here is `public/`, and
// every pattern below is resolved RELATIVE TO `public/`.
//
// That is exactly why the previous config was broken. Its patterns were:
//
//     public/**/*            -> resolved as public/public/**/* -> matched NOTHING
//     !public/.gitignore     -> resolved as public/public/...   -> inert
//     !public/fonts          -> resolved as public/public/fonts -> inert
//     !public/images         -> resolved as public/public/images-> inert
//
// The double `public/` prefix meant the glob matched zero files, so the "clean"
// silently did nothing while its exclusions looked like protection. Worse, it
// was a live landmine: had output.path ever resolved to the repo root (no
// `artisan` file, or any non-Laravel layout), `public/**/*` would have deleted
// public/.well-known (ACME/Let's Encrypt challenges), public/storage,
// public/index.php, public/.htaccess, public/admin_assets/**, the 700MB of
// public/attachments/** customer uploads, and the committed vendor libraries
// under public/assets/<name>/.
//
// An INCLUSION allow-list is used deliberately instead of `**/*` plus
// exclusions: with the latter, one missing exclusion destroys committed
// application files, whereas here a pattern only ever matches when it is
// explicitly listed. The patterns stop at the top level of public/assets/,
// which is where `mix.copyDirectory('tribinapp/dist/spa', 'public')` at the
// bottom of this file drops the SPA's hashed chunks.
//
// Cannot be matched by these patterns, and therefore always preserved:
//   - public/.well-known/**   ACME challenges (never referenced here)
//   - public/storage          Laravel storage link - as a directory OR as a
//                             symlink (del/rimraf unlink a symlink; they never
//                             follow it)
//   - public/attachments/**, public/admin_assets/**
//   - public/index.php, public/.htaccess, public/robots.txt, ...
//   - committed vendor libraries such as public/assets/bootstrap/**,
//     public/assets/DataTables/**, public/assets/js/** - they live in
//     SUBdirectories of public/assets, which the top-level `assets/*.ext`
//     glob does not reach.
// ---------------------------------------------------------------------------
mix.webpackConfig({
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                'assets/*.js',
                'assets/*.css',
                'assets/*.map',
                'assets/*.woff',
                'assets/*.woff2',
                'assets/*.ttf',
                'assets/*.eot',
                'assets/*.svg',
                'assets/*.png',
                'assets/*.jpg',
                'assets/*.jpeg',
                'assets/*.gif',
                'assets/*.ico',
            ],
        }),
    ],
});

mix.copy('tribinapp/dist/spa/index.html', 'resources/views/tribinapp.blade.php')
    .copyDirectory('tribinapp/dist/spa', 'public');
