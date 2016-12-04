var express = require('express');
var debug = require('debug')('app:server');
var webpack = require('webpack');
var webpackConfig = require('../build/webpack.config');
var config = require('../config');
var app = express();
var paths = config.utils_paths;
// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
//app.use(require('connect-history-api-fallback')())
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
    var compiler = webpack(webpackConfig);
    console.log('dev conf');
    debug('Enable webpack dev and HMR middleware');
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: paths.client(),
        hot: true,
        quiet: config.compiler_quiet,
        noInfo: config.compiler_quiet,
        lazy: false,
        stats: config.compiler_stats
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(express.static(paths.client('static')));
    var router = express.Router();
    router.get('/', function (req, res) {
        console.log(req, res);
        res.send('Hello World');
    });
    router.post('/all_tabs', function (req, res) {
        res.send('Hello World');
    });
    router.post('/updated_tabs', function (req, res) {
        res.send('Hello World');
    });
    app.use('/api', router);
}
else {
    debug('Server is being run outside of live development mode, meaning it will ' +
        'only serve the compiled application bundle in ~/dist. Generally you ' +
        'do not need an application server for this and can instead use a web ' +
        'server such as nginx to serve your static files. See the "deployment" ' +
        'section in the README for more information on deployment strategies.');
    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(express.static(paths.dist()));
}
module.exports = app;
