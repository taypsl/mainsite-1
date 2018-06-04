const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = (env) => {
  console.log(env);
  return {
  context: __dirname,
  entry: ["babel-polyfill", "./client/src/index.js"],

  output: {
    path: __dirname + '/client',
    // publicPath: "/client",
    filename: 'bundle.js',
  },
  
  // resolve: {
  //   alias :
  //     { Images: path.resolve(__dirname, 'src', 'img') },
  // },

  module: {
    rules: [
      {
        // exclude: /node_modules/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      // added code to work with svg
      // {
      //   test: /\.jsx?$/, // Match both .js and .jsx files
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   query: {
      //     presets: ['react'],
      //   },
      // },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      // {
      //   test: /\.(png|svg)$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //   },
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'url-loader'
      // }

      {
        test: /\.(png|svg|ico)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '/assets/images/[name]-[sha512:hash:base64:7].[ext]',
        },
        // include: [path.resolve(__dirname, 'src', 'img')]
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {},
      //     },
      //   ],
      // },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'file-loader'
      //     },
      //     {
      //       loader: 'svgo-loader',
      //       options: {
      //         plugins: [
      //           {removeTitle: true},
      //           {convertColors: {shorthex: false}},
      //           {convertPathData: false}
      //         ]
      //       }
      //     }
      //   ]
      // },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './client',
    // hot: true,
    // inline: true
    // proxy: { '/api': 'http://localhost:3000' },
    host: '0.0.0.0',
    port: 8000
    /* settings for serving from remote server
    port:80,
    proxy: {'/api':'http://52.39.81.245:3000'},
    */
  },
  plugins: 
    function(){
      switch (env.NODE_ENV) {
        case 'dev':
        case 'prod':
        //prod env vars already set up in server
          return [
            new webpack.DefinePlugin({ 'process.env':  
                { 
                  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
                  API_SPACE_ID: JSON.stringify(process.env.API_SPACE_ID),
                  API_TOKEN: JSON.stringify(process.env.API_TOKEN),
                  SMALL_CLAIMS_ID: JSON.stringify(process.env.SMALL_CLAIMS_ID) 
                } 
            }), 
            new webpack.optimize.OccurrenceOrderPlugin(),
            new UglifyJSPlugin({
              sourceMap: true,
              uglifyOptions: {
                properties: {
                  compress: {
                    warnings: false,
                    comparisons: false, // don't optimize comparisons
                  },
                },
              },
            }),
            new ExtractTextPlugin({ filename: '/src/public/stylesheets/app.css', allChunks: true, disable: false}),
          ];
        case 'full_test':
        //extract env vars from .env file
          return [
            new Dotenv(), 
            new webpack.optimize.OccurrenceOrderPlugin(),
            new UglifyJSPlugin({
              sourceMap: true,
              uglifyOptions: {
                properties: {
                  compress: {
                    warnings: false,
                    comparisons: false, // don't optimize comparisons
                  },
                },
              },
            }),
            new ExtractTextPlugin({ filename: '/src/public/stylesheets/app.css', allChunks: true, disable: false}),
          ];
        case 'frontend_test':
          return [
            new Dotenv(), 
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ExtractTextPlugin({ filename: '/src/public/stylesheets/app.css', allChunks: true, disable: false}),
          ];
        default:
          return;
      }
    }()
  };
};

module.exports = config;
