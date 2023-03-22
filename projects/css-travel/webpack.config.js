const path = require('node:path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  entry: './src/main.ts',

  output: {
    filename: 'assets/js/[name].[contenthash:6].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          (process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader),
          'css-loader',
        ],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          (process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader),
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    UnoCSS(),
    new HtmlWebpackPlugin({
      title: 'css-travel',
      template: './public/index.html',
    }),
  ],

  optimization: {
    realContentHash: true,
  },

  devServer: {
    hot: true,
    open: true,
    port: '3030',
  },
}
