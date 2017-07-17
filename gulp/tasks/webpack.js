var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var config = require('../config');
var exec = require('child_process').exec;

gulp.task('webpack', ['webpack:create-main', 'webpack:build-web', 'webpack:build-node'])
gulp.task('webpack:web', ['webpack:create-main', 'webpack:build-web'])
gulp.task('webpcak:node', ['webpack:create-main', 'webpack:build-node'])

gulp.task('webpack:create-main', function(cb) {
  exec('./src/create_main.sh', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('webpack:build-web', function(cb) {
  var conf = config.webpack.web
  gulp.src(conf.entry)
      .pipe(webpack(conf))
      .pipe(gulpif(config.js.uglify, uglify()))
      .pipe(gulp.dest(conf.output.path));
})

gulp.task('webpack:build-node', function(cb) {
  var conf = config.webpack.node
  gulp.src(conf.entry)
      .pipe(webpack(conf))
      .pipe(gulpif(config.js.uglify, uglify()))
      .pipe(gulp.dest(conf.output.path));
})

