const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve("./dist"),
    /* 
      publicPath: a virtual path where the server will serve files from
      For example, webpack server will serve our files in /dist(actual disk location) and mount them to /public
      We have to go to localhost:8080/public to see the page
      publicPath: path.resolve("/public")
    */
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.(png|jpeg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Image: path.resolve(__dirname, 'assets/img')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React prototype',
      template: "./src/index.html"
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial', // async is for dynamic import syntax -> import(....)
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        },
        reactVendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          reuseExistingChunk: true
        }
      }
    },
  }
}
