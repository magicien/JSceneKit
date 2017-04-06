var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config');

gulp.task('eslint', function() {
  return gulp.src(config.eslint.src)
    .pipe(eslint(config.eslint.opts))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['eslint']);

gulp.task('eslint-quiet', function() {
  config.eslint.opts.quiet = true
  return gulp.src(config.eslint.src)
    .pipe(eslint(config.eslint.opts))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint-quiet', ['eslint-quiet']);

