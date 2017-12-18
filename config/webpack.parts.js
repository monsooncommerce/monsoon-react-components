const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// CODE

exports.loadJavascript = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: ['babel-loader'],
      }
    ],
  },
});

// exports.loadMarkdown = ({include, exclude} = {}) => ({
//   module: {
//     rules: [
//       {
//         test: /\.md$/,
//         include,
//         exclude,
//         use: [
//           {
//             loader: "html-loader"
//           },
//           {
//             loader: "markdown-loader",
//             options: {
//             }
//           }
//         ],
//       }
//     ]
//   }
// });

exports.loadRaw = ({include, exclude} = {}) => ({
  module: {
      rules: [
        {
          test: /\.md$/,
          include,
          exclude,
          use: 'raw-loader'
        }
      ]
    }
});

// STYLES

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')()
    ]),
  },
});

exports.loadStyles = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include,
        exclude,
        use: [
          { loader: 'style-loader', options: {sourceMap: true}},
          { loader: 'css-loader', options: {sourceMap: true, modules: false}},
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer')()
              ]),
            },
          },
          { loader: 'resolve-url-loader'},
          { loader: 'sass-loader', options: {sourceMap: true}}
        ]
      }
    ]
  }
});

// DEV SERVER

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    hotOnly: true,
    historyApiFallback: true,
    stats: 'errors-only',
    host,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
});

// SETUP

exports.HtmlWebpackPlugin = () => ({
  plugins: [
    new HtmlWebpackPlugin({ title: 'NPM Lib Boiler'})
  ]
});
