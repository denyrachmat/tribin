let mix = require('laravel-mix');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Add the CleanWebpackPlugin to clean specific directories/files before each build
mix.webpackConfig({
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                'public/**/*', // Clean everything in the `public` directory
                '!public/.gitignore', // Exclude the .gitignore file (if it exists)
                '!public/fonts', // Exclude the `fonts` directory (if it exists)
                '!public/images', // Exclude the `images` directory (if it exists)
            ],
        }),
    ],
});

mix.copy('tribinapp/dist/spa/index.html', 'resources/views/tribinapp.blade.php')
    .copyDirectory('tribinapp/dist/spa', 'public');
