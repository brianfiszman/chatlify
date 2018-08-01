const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const express = require("express");

const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "public");
const APP_DIR = path.resolve(__dirname, "src");

const app = express();

module.exports = merge(common, {
  mode: "production",
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
  watch: false,
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: false,
    compress: true,
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
        include: `${__dirname}/src`,
        query: {
          plugins: ["transform-runtime"],
          presets: ["env", "react", "flow"]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: `${__dirname}/src`,
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
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath("css/bootstrap-min.css").replace("css/js", "css");
      },
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ["popper.js", "default"],
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ecma: 8,
        ie8: false,
        safari10: false,
        output: {
          comments: false,
          beautify: false
        },
        parse: {
          html5_comments: true
        },
        compress: true,
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: "bundle.js.gz",
      algorithm: "gzip",
      test: /\.js$|\.jsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});

app.get("*.js", function(req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});
