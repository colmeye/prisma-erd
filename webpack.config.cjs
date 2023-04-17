const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false,
    },
  },
  output: {
    filename: 'bundle.cjs',
    path: path.resolve(__dirname, 'bin'),
  },
};
