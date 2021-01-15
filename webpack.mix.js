let mix = require('laravel-mix');
require('mix-tailwindcss');
require('laravel-mix-purgecss');

mix.js('./resources/js/app.js', 'public/js').sass('./resources/css/style.scss', 'css').purgeCss({
    enabled: false,
}).setPublicPath('public').version();;