const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/client/main.js' // Vote App
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output:  {
    path:       path.join(__dirname, 'public/dist'),
    filename:   'vote-app.js',
    publicPath: '/dist'
    },

    //context: path.join(__dirname, 'src'),

    devtool: 'source-map',

    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'public'),
        publicPath: path.join(__dirname, 'public/dist'),
        historyApiFallback: true
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader'
            ],
            exclude: /node_modules/
        }],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};