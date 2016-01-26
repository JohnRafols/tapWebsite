'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');

// gulp.task('sass:prod', function () {
//   gulp.src('./sass/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer({
//        browsers: ['last 2 version']
//     }))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:dev', function () {
//   gulp.src('./sass/*.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer({
//       browsers: ['last 2 version']
//     }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./css'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass:dev']);
// });

 
gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'stylesheets',
      sass: 'sass'
    }))
    .pipe(gulp.dest('app/assets/temp'));
});

// gulp.task('default', ['sass:dev', 'sass:watch']);
gulp.task('default', ['compass']);
