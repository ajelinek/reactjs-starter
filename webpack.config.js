const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;  //This keeps the .babelrc file in synce


const PATHS = {
    app: path.join(__dirname, 'src/app'),
    build: path.join(__dirname, '/build')
};

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx'] // '' is needed to allow imports without an extension.
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loaders: ["style", "css", "sass"], include: PATHS.app},
            {test: /\.jsx?$/, loaders: ['babel?cacheDirectory'], include: PATHS.app}  //jsx and js
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ReactJs-QuickStart',
            template: 'index-template.ejs',
            inject: 'body'
        })
    ]
};

//Target Represents the same name in
if (TARGET === 'dev' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
            proxy: {
                'api/*': {
                    target: 'http://localhost:5000/',
                    secure: false
                }
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}
