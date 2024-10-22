module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
}
