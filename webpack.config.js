const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


const bundles = ['dashboard']; // add 'frontend' if needed
const htmlBundles = bundles.map(value => new HtmlPlugin({
  chunks: [
    `${value}/app`, 'manifest', 'vendor'
  ],
  title: `MDSLab`,
  filename: `build/${value}/index.html`,
  template: 'public/index.html',
  inject: true,
  hash: true,
  cache: true
}));

const webpackConfig = {
  entry: {
    'dashboard/app': ['./client/dashboard/app.js'],
    // 'frontend/app': ['./client/frontend/app.js'],
    'vendor': ['babel-polyfill', 'lodash']
  },
  output: {
    filename: './build/[name].min.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: [/\.js$/i],
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              env: {
                browser: true,
                node: true
              },
              parserOptions: {
                ecmaVersion: 7,
                ecmaFeatures: {
                  jsx: false,
                  experimentalObjectRestSpread: true,
                  modules: true
                }
              },
              rules: {
                'no-useless-constructor': ['off'],
                'react/jsx-no-bind': ['warn']
              },
              parser: 'babel-eslint',
              plugins: ['import', 'react']
            }
          }, {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              compact: true,
              presets: [
                [
                  'env', {
                    "targets": {
                      "browsers": ["> 1%"]
                    }
                  }
                ],
                'es2015',
                'stage-0',
                'react'
              ],
              plugins: ['transform-decorators-legacy']
            }
          }
        ]
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
      }, {
        test: [
          /\.woff$/i, /\.woff2$/i
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 15000,
              mimetype: 'application/font-woff',
              name: 'public/fonts/[hash:base64:12].[ext]'
            }
          }
        ]
      }, {
        test: [
          /\.ttf$/i, /\.eof$/i, /\.eot$/i
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 15000,
              mimetype: 'application/octet-stream',
              name: 'public/fonts/[hash:base64:12].[ext]'
            }
          }
        ]
      }, {
        test: [/\.(jpg|jpeg|png|gif|svg)$/i],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 15000,
              name: 'public/images/[hash:base64:12].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: plugins: [
    ...htmlBundles,
    new ExtractTextPlugin({
      filename: './build/[name].min.css',
      ignoreOrder: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      include: /\.min\.js$/
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    })
  ]
};

webpackConfig.devtool = process.env.NODE_ENV === 'development' ? 'eval' : ''

module.exports = webpackConfig
