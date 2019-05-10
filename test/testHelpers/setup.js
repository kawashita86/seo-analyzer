const config = {
    babelrc: false,
    presets: [['@babel/env',{
        "modules": "commonjs",
        "targets": {
            "node": "current"
        }
    }], '@babel/react'],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-object-rest-spread'
    ]
};
module.exports = require('babel-jest').createTransformer(config);