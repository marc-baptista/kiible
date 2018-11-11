const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = [
  'babel-polyfill',
  'webpack-dev-server/client?http://localhost:3030', // Needed for hot reloading
  path.resolve(__dirname, 'src/js/index.js') // Start with js/index.js
];
// Output
const output = { // Compile into build/ directory
  path: path.resolve(__dirname, 'build'),
  filename: 'js/bundle.js', // in js folder as bundle.js
  publicPath: '/build/',
};

// Hot module replacement plugin
const plugins = [
  new webpack.HotModuleReplacementPlugin(), // Make hot loading work
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html', // Move the index.html file
    inject: true
  }),
];

const loadersrules = [
     
    { // preloaders
       test: /\.js$/,
       enforce: "pre",
       exclude: [
         path.resolve(__dirname, '/node_modules/'), 
         path.resolve(__dirname, '/build/')
       ],
       use: [
         { loader: 'eslint-loader',
         options: {
                presets: ["es2015", "stage-0", "react"],
                plugins: ['transform-runtime']
            } 
          }
       ]
    },
     // loaders
/*    { 
       test: /\.js$/,
       exclude: [
         path.resolve(__dirname, '/node_modules/')
       ],
       use: [
         { loader: 'babel-loader',
         options: {
                presets: ["es2015"]
            } 
          }
       ]
    },*/
    { 
      test: /\.scss$/,
      use: [
        { loader: 'style' },
        { loader: 'css' },
        { loader: 'sass' }
      ]
    },
    { 
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[local]',
        'resolve-url?outputStyle=expanded'
      ]
    },
    { 
      test: /\.jpe?g$|\.gif$|\.png$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8000
          } 
        }
      ]
    }
];

const resolvemodules = {
  modules: [
    path.resolve(__dirname, './src'),
    "node_modules"
  ],
  enforceExtension: false,
  extensions: ['.js', '.json']
};

module.exports = {
  entry: entry,
  output: output,
  module: {
    rules: loadersrules
  },
  resolve: resolvemodules,
  plugins: plugins,
  target: 'web' // Make web variables accessible to webpack, e.g. window

};
