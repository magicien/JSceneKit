var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var config = require('../config');
var exec = require('child_process').exec;

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
      .pipe(gulp.dest(conf.output.path))
      .on('end', cb)
})

gulp.task('webpack:build-node', function(cb) {
  var conf = config.webpack.node
  gulp.src(conf.entry)
      .pipe(webpack(conf))
      .pipe(gulpif(config.js.uglify, uglify()))
      .pipe(gulp.dest(conf.output.path))
      .on('end', cb)
})

gulp.task('webpack:build-web-min', function(cb) {
  var conf = config.webpack.webmin
  gulp.src(conf.entry)
      .pipe(webpack(conf))
      .pipe(gulpif(config.js.uglify, uglify()))
      .pipe(gulp.dest(conf.output.path))
      .on('end', cb)
})

gulp.task('webpack', gulp.series('webpack:create-main', gulp.parallel('webpack:build-web', 'webpack:build-web-min', 'webpack:build-node')))
gulp.task('webpack:web', gulp.series('webpack:create-main', gulp.parallel('webpack:build-web', 'webpack:build-web-min')))
gulp.task('webpack:node', gulp.series('webpack:create-main', 'webpack:build-node'))
