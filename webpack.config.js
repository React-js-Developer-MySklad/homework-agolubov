const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: './main.tsx',
    context: resolve(__dirname, 'src'),
    output: {
        path: resolve(__dirname, 'build'),
        clean: true,
        filename: "[name].[contenthash].js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'index.html'}),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(__dirname, 'tsconfig.json')
            }
        })
    ]
};