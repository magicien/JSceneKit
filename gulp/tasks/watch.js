var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config').watch;

gulp.task('watch', function() {
  watch(config.js, function() {
    gulp.start('webpack');
  });
});

