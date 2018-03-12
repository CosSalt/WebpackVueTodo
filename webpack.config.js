const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'


const config = {
  target: 'web',
  entry: path.join(__dirname,'src/index.js'),
  //entry: path.resolve(__dirname,'src/index.js'),
  output:{
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.jsx$/,
        loader: 'babel-loader'
      },
      /*{
        test:/\.css$/,
        //loader: 'css-loader'
        use:[
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.styl/,
        use:[
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },*/
      {
        test: /\.(gif|jpe?g|png|svg)(\?.+)?$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 10000,
              name: '[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLWebpackPlugin()
  ]
}

if(isDev){
  config.module.rules.push({
    test: /\.styl/,
    use:[
      'style-loader',
      'css-loader',
      {
        loader:'postcss-loader',
        options:{
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    //host: '0.0.0.0',
    host: '127.0.0.1',
    overlay:{
      errors: true,
    },
    //historyFallback:{
    //},
    open: true,
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin
  )
}else{
  config.entry = {
    app: path.join(__dirname,'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use:[
        'css-loader',
        {
          loader:'postcss-loader',
          options:{
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    })
  )
}


module.exports = config
