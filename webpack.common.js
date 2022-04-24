const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        madrec: './src/js/entry.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // resolve: { extensions: [".js", ".ts"] },
    plugins: [
        new Dotenv({
            path: '.env',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Madrid Recicla Web',
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    // 'postcss-loader',
                    // 'sass-loader'
                ],
            },
        ],
    },
};