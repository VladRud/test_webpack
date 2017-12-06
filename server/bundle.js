const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config');
const path = require('path');
const fs = require('fs');
const mainPath = path.resolve(__dirname, '..', 'app', 'main.js');

module.exports = () => {
    let bundleStat = null;
    const compiler = Webpack(webpackConfig);

    compiler.plugin('compile', () => {
        console.log('Bundling...');
        bundleStat = Date.now();
    });

    compiler.plugin('done', () => {
        console.log('Bundled in ' + (Date.now() - bundleStat) + 'ms');
    });

    const bundler = new WebpackDevServer(compiler, {
        publicPath: '/build/',
        hot: true,
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    });

    bundler.listen(8080, 'localhost', () => {
        console.log('Building project, please wait...');
    })
};
