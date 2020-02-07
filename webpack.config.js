var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin({

        }), //clean the dist folder
        new HtmlWebpackPlugin({
        title: 'My web page',
        inject: 'body',
        filename: 'index.html',
        template: './src/index.html'
        }),//generates the html
    ],
    devServer: {
        contentBase: '/dist'
    },

}
