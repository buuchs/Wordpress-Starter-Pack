const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dev = process.env.NODE_ENV === "dev";

let cssLoaders = [
    {loader: 'css-loader', options: {importLoaders: 1, minimize: !dev}},
];

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

    entry: {
        main: ['./assets/scss/app.scss', './assets/js/app.js']
    },
    watch: dev,
    output: {
        path: path.resolve('./dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash:15].js',
        publicPath: '/dist/',
    },

    resolve: {
        alias: {
            '@css': path.resolve('./assets/scss/'),
            '@js': path.resolve('./assets/js/')
        }
    },

    devtool: dev ? "cheap-module-eval-source-map" : false,
    devServer: {
        port:3000,
        historyApiFallback: {
            index: 'index.php',
        },
        contentBase: path.resolve('../../../'),
        hot:true,
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['eslint-loader'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: cssLoaders
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [...cssLoaders, 'sass-loader']
                }),

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:15].[ext]',
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enable: !dev
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: dev ? '[name].css' : '[name].[contenthash:15].css',
            disable: dev
        })
    ],
};

if (!dev) {
    config.plugins.push(new UglifyJSPlugin());
    config.plugins.push(new ManifestPlugin());
    config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: path.resolve('./'),
        verbose: true,
        dry: true
    }))
}

module.exports = config;