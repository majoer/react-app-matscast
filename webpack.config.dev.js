const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'sass-loader', options: {
              implementation: require("dart-sass")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader?name=public/fonts/[name].[ext]']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader?name=/public/icons/[name].[ext]"]
      }
    ]
  },
  plugins: [htmlPlugin],
  devtool: 'source-map',
  devServer: {
    port: 3100,
    historyApiFallback: true
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      environment: path.join(__dirname, `src/environment/environment.localhost.js`)
    }
  }
};
