var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var config = require('../config');
require('./webpack')

gulp.task('build', gulp.task('webpack'))

