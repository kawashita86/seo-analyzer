// Imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
        })
    ],
    // OPTIONAL
    // Reload On File Change
    watch: true,
    // Development Tools (Map Errors To Source File)
    devtool: 'source-map',
};
// Exports
module.exports = config;