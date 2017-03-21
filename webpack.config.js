var webpack = require("webpack");
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': "jquery"});
module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: "./static/",
        publicPath: "http://localhost:8080/static/",
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0')
                    ]
                }
            },
            {test: /\.(jpg|png|svg|gif)$/, loader: "url-loader"}
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        inline: true
    },
    plugins: [providePlugin]
}