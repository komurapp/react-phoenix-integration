const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

function join(dest) { return path.resolve(__dirname, dest); }
function web(dest) { return join('frontend/' + dest); }

const devPublicPath = `http://localhost:4001/`;

const devEntry = [
  require.resolve('webpack-dev-server/client') + '?' + devPublicPath,
  web('app.js')
];

const prodEntry = [
  web('app.js')
];

module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    contentBase: join('priv/static'),
    port: 4001,
    publicPath: devPublicPath,
    stats: {
      colors: true,
      version: false,
      chunkModules: false
    }
  },
  entry: isProduction ? prodEntry : devEntry,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'priv/static/js'),
    publicPath: isProduction ? "/" : devPublicPath
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules'],
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};
