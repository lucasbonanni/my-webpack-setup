var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[chunkhash].js'
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin({}), //clean the dist folder
        new HtmlWebpackPlugin({
            title: 'My web page',
            inject: 'body',
            filename: 'index.html',
            template: './src/index.html',
        }), //generates the html
        new MiniCssExtractPlugin({
            filename: '/css/[name].[contenthash].css',
            chunkFilename: '/css/[id].[contenthash].css',
        }),
        new MinifyPlugin()
    ],
    devServer: {
        contentBase: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            webpackImporter: true,
                        },
                    }
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                },
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                },
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
            },

        ]
    }
};
