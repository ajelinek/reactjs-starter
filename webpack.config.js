const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');


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
    // Add resolve.extensions.
    // '' is needed to allow imports without an extension.
    // Note the .'s before extensions as it will fail to match without!!!
    resolve: {
        extensions: ['', '.js', '.jsx']
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
    }
};

//Target Represents the same name in
if (TARGET === 'web-dev' || !TARGET) {
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
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}
