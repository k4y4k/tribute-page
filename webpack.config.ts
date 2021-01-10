import * as path from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/ts/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js', // makes dragonbones work
    }),
  ],

  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: 'main.bundle.js',
  },
}

module.exports = config
