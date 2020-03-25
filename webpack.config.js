const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist/');
const APP_DIR = path.resolve(__dirname, 'src/');

module.exports = env => {
  return {
    entry: APP_DIR + '/index.js',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles Sass to CSS
          ]
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader' // translates CSS into CommonJS
          ]
        },
        {
          test: /\.(png|woff|jpe?g|svg|otf|ico|woff2|eot|ttf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        filename: './index.html',
        minify: 'true'
      }),
      new CopyPlugin([{ from: 'public/site', to: 'site/' }])
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
