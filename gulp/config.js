var path = require('path');
var babel = require('babel-core/register');

var src = './src';
var dest = './build';

var relativeSrcPath = path.relative('.', src);

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false
  },

  eslint: {
    src: [
      src + '/js/**',
      './test/**/*.js',
      '!' + src + '/js/third_party/*.js',
      '!' + src + '/js/etc/*.js'
    ],
    opts: {
      useEslintrc: true,
    }
  },

  webpack: {
    entry: src + '/js/main.js',
    output: {
      filename: 'jSceneKit.js',
      library: 'JSceneKit',
      libraryTarget: 'var'
    },
    resolve: {
      extensions: ['', '.js']
    },
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
      require: ['chai']
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

