module.exports = {
  entry:   ['react-hot-loader/patch',
            './src/client/main.js'],
  output:  {
    path:     __dirname,
    filename: 'public/dist/vote-app.js'
  },
  
  module:  {
    //loaders: [
      rules: [
      {
        test:    /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
