let mix = require('laravel-mix');

mix.copy('tribinapp/dist/spa/index.html', 'resources/views/tribinapp.blade.php')
    .copyDirectory('tribinapp/dist/spa', 'public');
