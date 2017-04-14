var webpack = require('webpack');
module.exports = {
  entry: [
    "./app.js",
  ],
  output: {
    path: __dirname + '/static',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },	             
	   {
			test: /\.(png|jpg|ico)$/,
			loader: 'url-loader?limit=20480'
	   }
    ]
  },
  plugins: [
  
  ]
};
