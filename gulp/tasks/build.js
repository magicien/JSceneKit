var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var config = require('../config');

gulp.task('build', ['webpack']);

