var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config');

gulp.task('eslint', function() {
  return gulp.src(config.eslint.src)
    .pipe(eslint(config.eslint.opts))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('lint', gulp.task('eslint'))

gulp.task('eslint-quiet', function() {
  config.eslint.opts.quiet = true
  return gulp.src(config.eslint.src)
    .pipe(eslint(config.eslint.opts))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('lint-quiet', gulp.task('eslint-quiet'))

