const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const settings = {
  publicPath: path.join(__dirname, "public"),
  srcPath: path.join(__dirname, "src")
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath)
}

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    devtool: isDevMode ? "source-map" : false,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceMap: isDevMode
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader', options: {
                sourceMap: isDevMode
              }
            },
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets/"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: srcPathExtend("index.html")
      })]
  }
}
