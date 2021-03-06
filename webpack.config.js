var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin({}), //clean the dist folder
        new HtmlWebpackPlugin({
            title: 'My web page',
            inject: 'body',
            filename: 'index.html',
            template: './src/index.html'
        }) //generates the html
    ],
    devServer: {
        contentBase: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader',
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader',
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
            },
        ]
    }
};
