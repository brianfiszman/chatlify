const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "src/client");

const config = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      jquery: "jquery/dist/jquery.slim.js"
    }
  },
  entry: APP_DIR + "/index.js",
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  watch: true,
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true,
    port: 4000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader?minimize"
          },
          {
            loader: "sass-loader?minimize"
          }
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: `${__dirname}/src/client`,
        query: {
          plugins: ["transform-runtime"],
          presets: ["env", "react", "flow"]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: `${__dirname}/src/client`,
        query: {
          plugins: ["transform-runtime"],
          presets: ["env", "react", "flow"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader?minimize"
          }
        ]
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: "url-loader?limit=30000&name=[name]-[hash].[ext]"
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin("main.css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ["popper.js", "default"],
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    })
  ]
};
module.exports = config;
