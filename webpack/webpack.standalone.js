/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main.ts',
  },
  mode: 'production',
  target: 'node',
  externals: {},

  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
    libraryTarget: 'commonjs',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          // ADD THIS
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets',
          // AND THIS
          '@nestjs/websockets/socket-module',
          '@nestjs/platform-express',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
};
