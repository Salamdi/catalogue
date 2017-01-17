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
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-html-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
		        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		        loader: 'url'
		    }
		]
	},
	watch: true
};