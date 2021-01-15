let mix = require('laravel-mix'); 
var path = require('path')
require('laravel-mix-purgecss');

mix.js('./resources/js/app.js', 'public/js').sass('./resources/css/style.scss', 'css').purgeCss({
    content: [path.join(__dirname, 'resources/views/**/*.edge')],
}).setPublicPath('public').version();;