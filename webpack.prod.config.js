// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
require("@babel/register");
// Webpack Configuration
const config = {
    // Entry
    entry: './src/index.js',
    mode: 'production',
    // Output
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: true
    },
    // Loaders
    module: {
        rules : [
            // JavaScript/JSX Files
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // CSS Files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // Plugins
 /*   plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            hash: true
        })
    ],*/
    // OPTIONAL
    // Reload On File Change
    // Development Tools (Map Errors To Source File)
    devtool: false,
};
// Exports
module.exports = config;