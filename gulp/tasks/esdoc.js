var gulp = require('gulp');
var esdoc = require('gulp-esdoc');
var config = require('../config');

gulp.task('esdoc', function() {
  gulp.src(config.js.src)
      .pipe(esdoc(config.esdoc));
});

gulp.task('doc', ['esdoc']);

