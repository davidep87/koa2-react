const _ = require('lodash');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const bundles = ['dashboard']; // add 'frontend' if needed
const htmlBundles = bundles.map(value => new HtmlPlugin({
    chunks: [`${value}/app`, 'manifest', 'vendor'],
    title: `MDSLab`,
    filename: `build/${value}/index.html`,
    template: 'public/index.html',
    inject: true, hash: true, cache: true
}));

const webpackConfig = {
	entry: {
		'dashboard/app': ['./client/dashboard/app.js'],
		// 'frontend/app': ['./client/frontend/app.js'],
    'vendor': [ 'babel-polyfill', 'lodash' ],
	},
	output: {
		filename: './build/[name].min.js',
		publicPath: '/',
	},
	plugins: [
        ...htmlBundles,
		new ExtractTextPlugin({ filename: './build/[name].min.css', ignoreOrder: true }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanPlugin(['build']),
		new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
	],
	module: {
		rules: [{
			test: [/\.js$/i],
			exclude: /node_modules/,
			use: [{
				loader: 'eslint-loader',
				options: {
					env: { browser: true, node: true },
					parserOptions: {
						ecmaVersion: 7,
						ecmaFeatures: {
							jsx: false,
							experimentalObjectRestSpread: true,
							modules: true,
						},
					},
					rules: {
						'no-useless-constructor': ['off'],
						'react/jsx-no-bind': ['warn'],
					},
					parser: 'babel-eslint',
					plugins: ['import', 'react'],
				},
			},{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					babelrc: false,
					compact: true,
					presets: [
            ['env', {
              "targets": {
                "browsers": ["> 1%"]
              },
            }], 'es2015', 'stage-0', 'react'],
					plugins: ['transform-decorators-legacy'],
				},
			}],
		},{
      test: /\.css$/i,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader',
      exclude: /flexboxgrid/
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules',
      include: path.join(__dirname, 'node_modules'),
    },{
			test: [/\.woff$/i, /\.woff2$/i],
			use: [{
				loader: 'url-loader',
				options: {
					limit: 15000,
					mimetype: 'application/font-woff',
				},
			}],
		},{
			test: [/\.ttf$/i, /\.eof$/i],
			use: [{
				loader: 'url-loader',
				options: {
					limit: 15000,
					mimetype: 'application/octet-stream',
				},
			}],
		},{
			test: [/\.(jpg|jpeg|png|gif|svg)$/i],
			use: [{
            loader: 'url-loader',
            options: {
                limit: 15000,
                name: 'images/[hash:base64:12].[ext]'
            }
          }]
		}],
	}
};

webpackConfig.devtool = process.env.NODE_ENV === 'development' ? 'eval' : '';

module.exports = webpackConfig;
