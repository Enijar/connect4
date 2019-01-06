const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const postCSSLoaderPlugins = [
  require('autoprefixer')({
    browsers: [
      '> 0.3%',
      'last 7 versions',
      'Android >= 4',
      'Firefox >= 20',
      'iOS >= 8',
    ],
    flexbox: true,
  }),
];

if (process.env.NODE_ENV === 'production') {
  postCSSLoaderPlugins.push(require('cssnano')({preset: 'default'}));
}

const SRC_PATH = path.resolve(__dirname);
const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');

module.exports = {
  entry: {
    'js/index.js': path.resolve(SRC_PATH, 'js', 'index.js'),
    'css/index.css': path.resolve(SRC_PATH, 'sass', 'index.scss'),
  },
  output: {
    filename: '[name]',
    path: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => postCSSLoaderPlugins,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([PUBLIC_PATH]),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      minify: process.env.NODE_ENV === 'development' ? false : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: path.resolve(__dirname, 'index.html'),
    }),
    new ExtractTextPlugin({
      filename: '[name]',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(SRC_PATH, 'img'),
        to: path.join(PUBLIC_PATH, 'img'),
      },
    ]),
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
};
