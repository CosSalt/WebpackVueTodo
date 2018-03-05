const path = require('path')

module.exports = {
  entry: path.join(__dirname,'src/index.js'),
  //entry: path.resolve(__dirname,'src/index.js'),
  output:{
    filename: 'bundle.js',
    path: path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader: 'vue-loader'
      },
      {
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
          'stylus-loader'
        ]
      },
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
  }
}