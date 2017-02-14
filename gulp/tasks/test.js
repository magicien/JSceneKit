var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var config = require('../config');

gulp.task('test', function() {
  return gulp.src(config.mocha.src, {read: false})
             .pipe(mocha(config.mocha.opts))
             .on('error', util.log);
});

