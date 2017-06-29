module.exports = {
  entry: './index.js',
  resolve: {
    modules: [__dirname],
  },
  output: {
    path: __dirname,
    filename: 'output.js',
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        use: [
          {
            loader: 'elm-css-modules-loader',
            options: {
              package: 'user/project',
            },
          },
          {
            loader: 'elm-webpack-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules=true'],
      },
    ],
  },
};
