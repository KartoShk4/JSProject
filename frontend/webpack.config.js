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
    // SCSS правила
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader",],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./node_modules/@fortawesome/fontawesome-free/webfonts", to: "webfonts"},
                {from: "./node_modules/@fortawesome/fontawesome-free/css/all.min.css", to: "css"},
                {from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "css"},
                {from: "./node_modules/bootstrap/dist/js/bootstrap.min.js", to: "js"},
            ],
        }),
    ],
};