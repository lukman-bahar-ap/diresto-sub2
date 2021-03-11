/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|ico|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      favicon: './src/public/icons/favicon.ico',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public/fonts',
          to: 'fonts/',
        },
        {
          from: './src/public/images/footer-background.png',
          to: 'img/footer-background.png',
        },
        {
          from: './src/public/icons/favicon.ico',
          to: 'assets/favicon.ico',
        },
        {
          from: './src/public/icons/icon-192x192.png',
          to: 'assets/icon-192x192.png',
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'diresto',
      short_name: 'diresto',
      description: 'Diresto discover cafe and resto',
      background_color: '#ff9642',
      theme_color: '#ff9642',
      display: 'standalone',
      filename: 'manifest.json',
      start_url: '/index.html',
      crossorigin: null,
      icons: [
        {
          src: path.resolve('src/public/icons/icon-192x192.png'),
          size: [72, 96, 128, 144, 152, 192],
        },
        {
          src: path.resolve('src/public/icons/icon-384x384.png'),
          size: [256, 384],
          purpose: 'any maskable',
        },
        {
          src: path.resolve('src/public/icons/icon-512x512.png'),
          size: '512x512',
          purpose: 'maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),
  ],
};
