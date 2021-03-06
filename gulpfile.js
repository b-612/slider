'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-cssmin');
var jsminify = require('gulp-minify');
var flatten = require('gulp-flatten');
var server = require('browser-sync').create();

gulp.task('clean', function () {
    return del('build');
});

gulp.task('copyhtml', function () {
    return gulp.src('source/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('cssclean', function () {
    return del('build/css');
});

gulp.task('css', function () {
    return gulp.src([
        'source/css/style.css',
        'source/css/slick.css',
        'source/css/custom-animate.css'
    ])
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css/'))
        .pipe(sourcemap.init())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css/'))
        .pipe(server.stream());
});

gulp.task('bootstrap', function () {
    return gulp.src([
      'source/css/bootstrap.min.css'
    ])
      .pipe(gulp.dest('build/css/'))
});

gulp.task('images', function () {
    return gulp.src([
      'source/img/*.{png,jpg,svg}',
      'source/img/towebp/*',
      '!source/img/test.webp'
    ])
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(flatten({
            includeParents: 0
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
    return gulp.src('source/img/towebp/*')
        .pipe(webp({quality: 99.9}))
        .pipe(gulp.dest('build/img'));
});

gulp.task('jsmin', function () {
    return gulp.src([
      'source/js/*.js',
      '!source/js/jquery-3.4.1.min.js',
      '!source/js/slick.min.js'
    ])
        .pipe(jsminify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            noSource:'*.js'
        }))
        .pipe(gulp.dest('build/js'))
});

gulp.task('jscopy', function () {
  return gulp.src([
    'source/js/jquery-3.4.1.min.js',
    'source/js/slick.min.js'
  ])
    .pipe(gulp.dest('build/js/'))
});

gulp.task('refresh', function (done) {
    server.reload();
    done();
});

gulp.task('server', function () {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('source/css/style.css', gulp.series('cssclean', 'css', 'bootstrap'));
    gulp.watch('source/*.html', gulp.series('copyhtml')).on('change', server.reload);
    gulp.watch('source/js/*.js', gulp.series('jsmin', 'refresh'));
});

gulp.task('build', gulp.series(
    'clean',
    'copyhtml',
    'images',
    'bootstrap',
    'css',
    'webp',
    'jscopy',
    'jsmin'
));

gulp.task('start', gulp.series('build', 'server'));
