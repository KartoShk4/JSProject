const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    // Устанавливаем точку входа в приложение
    entry: './src/app.js',
    mode: 'development',
    output: {
        // Генерируемый файл также называем app.js
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // Плагин сервера для разработки
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        // Так как сервер не находит файл на "сервере", он переводит на страницу index.html, который в свою очередь загружает скрипт app.js
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
            ],
        }),
    ],
};