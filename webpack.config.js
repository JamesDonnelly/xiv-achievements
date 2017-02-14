var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: [
    "babel-polyfill",
    "whatwg-fetch",
    "./js/app.js",
    "./less/app.less"
  ],
  module: {
    loaders: [
      { 
        exclude: /node_modeules|bower_components/,
        test: /\.less$/,
        loader: "style-loader!css-loader?root=./build!autoprefixer-loader!less-loader",
        publicPath: "./build"
      },
      {
        exclude: /node_modeules|bower_components/,
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        exclude: /node_modeules|bower_components/,
        test: /\.(woff2?|eot|svg|ttf|md|jpg|png)$/,
        loader: 'file-loader?name=[hash].[ext]&publicPath=./build/'
      }
    ]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};