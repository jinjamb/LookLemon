const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { plugin } = require('typescript-eslint');

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/babylonebundle.js',
        path: path.resolve(appDirectory, "./dist"),
    },
    resolve: {
        extensions: ['.js', '.ts'],
        fallback: {
            fs: false,
            path: false,
        },
    },
    module: {
        rules: [
            {
                test:/\.m?js/,
            },
            {
                test:/\.(js|mjs|jsx|ts|tsx)$/,
                loader: "source-map-loader",
                enforce: "pre",
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: 'ts-shader-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(mp3|wav|ogg|mp4|glb|hdr)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|env|gltf|webp|stl|dds|json)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            favicon: './public/favicon.ico',
            template: path.resolve(appDirectory, './src/index.html'),
        }),
         new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(appDirectory, 'public'), to: path.resolve(appDirectory, 'dist') },
            ],
        }),
    ],
};
