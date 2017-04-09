const path = require('path');
const babel = require('babel-core/register');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const src = './src';
//const dest = './';
const dest = '';

const relativeSrcPath = path.relative('.', src);

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest,
    uglify: false
  },

  eslint: {
    src: [
      src + '/js/**',
      './test/**/*.js',
      '!' + src + '/js/third_party/*.js'
    ],
    opts: {
      useEslintrc: true
    }
  },

  webpack: {
    node: {
      entry: src + '/js/main.js',
      output: {
        path: dest,
        filename: 'index.node.js',
        library: 'JSceneKit',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['', '.js']
      },
      plugins: [
        new webpack.DefinePlugin({'process.env.BROWSER': false})
      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      externals: {
        fs: 'fs'
      }
    },
    web: {
      entry: src + '/js/main.js',
      output: {
        path: dest,
        filename: 'index.web.js',
        library: 'JSceneKit',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['', '.js']
      },
      plugins: [
        new webpack.DefinePlugin({'process.env.BROWSER': true})
      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      node: {
        fs: false,
        Buffer: true
      },
      externals: {
        //fs: 'fs'
      }

    }
  },

  mocha: {
    src: ['test/**/*.js', 'src/**/*.js', '!src/**/*.web.js'],
    compilers: {
      js: babel
    },
    opts: {
      ui: 'bdd',
      reporter: 'spec', // or nyan
      globals: [],
      require: ['test/helper/testHelper', 'chai']
    }
  },

  copy: {
    src: [
    ],
    dest: dest
  },

  watch: {
    js: relativeSrcPath + '/js/**'
  }
}

