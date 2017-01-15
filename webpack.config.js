const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './app/app.js',
	output: {
		path: './docs',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /temp\.js/, /style\.js/],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin('sass-loader')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('.docs/style.css')
	],
	watch: true
};