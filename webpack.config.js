const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV || 'development'

const devMode = mode === 'development'

const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
   mode,
   target,
   devtool,
   context: path.resolve(__dirname, 'src'),
   entry: './index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]'
   },
   devServer: {
      port: 4200,
      hot: true
   },
   plugins: [
      new HTMLWebpackPlugin({
         template: './index.html'
      }),
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      }),
   ],
   module: {
      rules: [
         {
            test: /\.html$/i,
            loader: 'html-loader'
         },
         {
            test: /\.(c|sa|sc)ss$/i,
            use: [
               devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: [require('postcss-preset-env')]
                     }
                  }
               },
               'sass-loader'
            ]
         },
         {
            test: /\.(woff2?)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]'
            }
         },
         {
            test: /\.(png|jpe?g|webp|gif|svg)$/i,
            type: 'asset/resource',
            use: [
               {
                  loader: 'image-webpack-loader',
                  options: {
                     mozjpeg: {
                        progressive: true,
                     },
                     optipng: {
                        enabled: false,
                     },
                     pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                     },
                     gifsicle: {
                        interlaced: false,
                     },
                     webp: {
                        quality: 75
                     }
                  }
               }
            ]
         },
         {
            test: /\.m?js$/i,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         }
      ]
   }
}