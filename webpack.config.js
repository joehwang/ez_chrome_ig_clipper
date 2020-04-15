const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:  path.join(__dirname, 'src/index.js'),
    mode:"development",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
    rules: [
        {
            test: /.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.(scss)$/,
            use: [{
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles Sass to CSS
            }]
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        }
    ]
    },
  plugins: [
    new VueLoaderPlugin()
  ]
}