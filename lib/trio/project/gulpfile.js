'use strict';

var tri          = './trio',
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    notify       = require('gulp-notify'),
    include      = require('gulp-include'),
    postcss      = require('gulp-postcss'),
    sprites      = require('postcss-sprites'),
    clearfix     = require('postcss-clearfix'),
    sassGlob     = require('gulp-sass-glob'),
    livereload   = require('gulp-livereload'),
    autoprefixer = require('autoprefixer'),
    processors   = [
      clearfix,
      autoprefixer({browsers: ['last 2 version']}),
      sprites({
        stylesheetPath  : tri + '/css',
        spritePath      : tri + '/img/icons.png',
        retina          : true,
        outputDimensions: true,
        filterBy        : function(image) {
            return /^icon/gi.test(image.url);
        },
      })
    ];

gulp.task('styles', function() {

  gulp.src(tri + '/_sass/*.scss')
    .pipe(sassGlob())
    .pipe(sass(tri + '/_sass'))
    .pipe(postcss(processors))
    .on('error', console.log)
    .pipe(gulp.dest(tri + '/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());

});

gulp.task('scripts', function() {

  gulp.src(tri + '/_scripts/*.js')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest(tri + '/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});


// Rerun the task when a file changes
gulp.task('watch', function() {

  livereload.listen();
  gulp.watch(tri + '/_sass/**/*.scss', ['styles']);
  gulp.watch(tri + '/_scripts/**/*.js', ['scripts']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'styles', 'scripts', 'watch']);