const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV === "dev";

let cssLoaders = [
    'style-loader',
    {loader: 'css-loader', options: {importLoaders: 1}},
]

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                }),
            ]
        }
    })
}


let config = {

    entry: './asset/js/index.js',
    watch: dev,
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    devtool: dev ? "cheap-module-eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.scss$/,
                use: [
                    ...cssLoaders,
                    'sass-loader'
                ],

            }
        ]
    },

    plugins: [],
}

if (!dev) {
    config.plugins.push(new UglifyJSPlugin())
}

module.exports = config;