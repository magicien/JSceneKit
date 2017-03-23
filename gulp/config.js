const path = require('path');
const babel = require('babel-core/register');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const src = './src';
const dest = './';

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
    ],
    opts: {
      useEslintrc: true,
    }
  },

  webpack: {
    entry: src + '/js/main.js',
    output: {
      filename: 'index.js',
      library: 'JSceneKit',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['', '.js']
    },
    plugins: [
      //new UglifyJSPlugin()
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
    }
  },

  mocha: {
    src: ['test/**/*.js', 'src/**/*.js'],
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

