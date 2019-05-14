// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require("@babel/register");
// Webpack Configuration
const config = {
    // Entry
    entry: './src/index.js',

    // Output
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    /*resolve: {
        alias: {
            'lodash-es': 'lodash'
        }
    },*/
    // Loaders
    module: {
        rules : [
            // JavaScript/JSX Files
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // CSS Filesoptions: {
            // 			format: "jed1.x",
            // 			domain: "js-text-analysis",
            // 		},
            // 		src: [ "languages/*.po" ],
            // 		dest: "languages",
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        }),
        new BundleAnalyzerPlugin()
    ],
    // OPTIONAL
    // Reload On File Change
    watch: true,
    // Development Tools (Map Errors To Source File)
    devtool: 'eval',
};
// Exports
module.exports = config;