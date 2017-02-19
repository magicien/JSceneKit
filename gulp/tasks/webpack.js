var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var config = require('../config');
var exec = require('child_process').exec;

gulp.task('webpack', function(cb) {
  exec('./src/create_main.sh', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  gulp.src(config.webpack.entry)
      .pipe(webpack(config.webpack))
      .pipe(gulpif(config.js.uglify, uglify()))
      .pipe(gulp.dest(config.js.dest));
});

