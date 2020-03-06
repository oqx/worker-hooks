const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

const IS_DEV = process.env.NODE_ENV === 'development'

let webpackConfig = {
    entry: IS_DEV ? './demo/index.tsx' : './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name]-[hash].js',
        library: 'WorkerHooks',
        libraryTarget: IS_DEV ? 'umd' : 'commonjs2',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules(?!(\/|\\)flacheql)/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ].filter(x => x)
            },
            {
                test: /svg$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __IS_DEV__: IS_DEV
        }),
        /*
            If in development, use the HTML template to allow
            developer to view code as developing.
        */
        IS_DEV
            ? new HtmlWebpackPlugin({
                  template: './index.html'
              })
            : /*
                If building for prod, create a manifest to simplify
                retrieving the bundle.
            */
              new WebpackManifestPlugin()
    ].filter(x => x)
}

module.exports = webpackConfig
