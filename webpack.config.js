const path = require('path');

const postcssConfig = () => {
	return [
		require('postcss-import')(),
		require('autoprefixer')(),
		require('precss')()
	];
};

module.exports = {
	mode: 'development',
	entry: './src/assets/js/index.js',
	output: {
		filename: 'assets/js/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: postcssConfig()
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'url-loader'
					},
					{
						loader: 'img-loader'
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json', '.css', '.scss'],
		alias: {
			'@styles': path.resolve(__dirname, 'src/assets/styles'),
			'@images': path.resolve(__dirname, 'src/assets/images')
		},
		modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
	},
	devServer: {
		stats: 'errors-only',
		open: true, // Open the page in browser
		overlay: true
	}
};