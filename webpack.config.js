var webpack = require('webpack');

var env = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        'BROWSER': JSON.stringify(true)
    }
});

module.exports = {
    entry: {
        app: './src/client/app.js'
    },
    output: {
        path: __dirname + '/build/assets/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.styl$/,
                loader: 'style?singleton!css!autoprefixer!stylus'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [env],
    externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}'
    }
};
