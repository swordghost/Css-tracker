let Webpack = require('webpack');
let path = require('path');
let srcPath = path.resolve(__dirname, 'src');
let nodeModulesPath = path.resolve(__dirname, 'node_modules');

let config = {
    context: __dirname,
    entry: path.resolve(srcPath, 'entry.js'),
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    externals: {
        jquery: 'window.$'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {test: /\.hbs$/, loader: 'handlebars-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        alias: {
            // third-parties
            // 'backbone': path.resolve(nodeModulesPath, 'backbone.marionette', 'node_modules', 'backbone'),
            'marionette': 'backbone.marionette'
        },
        // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee']
    }
};

module.exports = config;