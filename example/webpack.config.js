module.exports = {
  entry: './index.js',
  resolve: {
    root: [require('path').resolve('.')],
  },
  output: {
    path: '.',
    filename: 'output.js',
  },
  module: {
    loaders: [
      {
        test: /\.elm$/,
        loaders: ['elm-css-modules-loader?package=user/project', 'elm-webpack'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules=true'],
      },
    ],
  },
};
