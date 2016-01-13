'use strict';

var path = require ('path');
var webpack = require ('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '/source'),

    entry: {
        product: './apps/product',
        common: './common'
    },

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        filename: '[name].js'
    },
    
    //watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            LANG: JSON.stringify('ru')
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         drop_console: true,
        //         unsafe: true
        //     }
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.ProvidePlugin({
            _: 'underscore'
        }),
        new ExtractTextPlugin('[name].css')
    ],

    resolve: {
        root: __dirname,
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            core: 'source/core',
            common: 'source/common'
        }
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('css?sourceMap')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
            }, 
            {
                test: /\.html/, 
                loader: 'html'
            }
        ]
    },

    noParse: [
        /\/node_modules\/(bootstrap|jquery)/
    ]
};

