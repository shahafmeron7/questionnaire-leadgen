const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const path = require('path');
// const dotenv = require('dotenv');

// dotenv.config();
// const envKeys = Object.keys(process.env)
//   .filter(key => key.startsWith('REACT_APP_'))
//   .reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
//     return prev;
//   }, {});
module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path:path.resolve(__dirname, "dist"),
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack', // temporarily remove options to see if the build passes
          'url-loader'
        ]
      }
      
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),

    }),
    new InterpolateHtmlPlugin({PUBLIC_URL: 'static' }),
    // new webpack.DefinePlugin(envKeys),

  ],
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx','.json'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    static: './dist',
    hot: true
  }
};
