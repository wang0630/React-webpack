const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
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
    static: './dist'
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
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
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
      chunks: 'all', // async is for dynamic import syntax -> import(....)
      cacheGroups: {
        reactVendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        },
        
      }
    },
  }
}
