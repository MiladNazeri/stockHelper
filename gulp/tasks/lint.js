var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lintJS', function () {

    return gulp.src(['../../../../src/**/*.js', '../../../../server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});