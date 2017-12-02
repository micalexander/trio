'use strict';
var fs           = require('fs'),
    path         = require('path'),
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    wait         = require('gulp-wait'),
    newer        = require('gulp-newer'),
    watch        = require('gulp-watch'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    include      = require('gulp-include'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    sprites      = require('postcss-sprites'),
    cssnano      = require('cssnano'),
    clearfix     = require('postcss-clearfix'),
    sassGlob     = require('gulp-sass-glob'),
    imagemin     = require('gulp-imagemin'),
    assetsPath  = path.normalize('{{ trio }}'),
    browserSync  = require('browser-sync').create(),
    autoprefixer = require('autoprefixer'),
    processors   = [
      clearfix,
      autoprefixer({browsers: ['last 2 version']}),
      cssnano
    ];

gulp.task('styles', function () {
  gulp.src(assetsPath + '/_sass/screen.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(assetsPath + '/css'))
    .pipe(notify('Sass compiled'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src(assetsPath+'/_images/**/*{jpg,png,gif,svg}')
    .pipe(newer(assetsPath+'/img'))

    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest(assetsPath+'/img'));
});

gulp.task('scripts', function() {

  gulp.src(assetsPath+'/_scripts/*.js')
    .pipe(include({
      includePaths: [
        __dirname+"/bower_components",
        assetsPath+"/_scripts",
      ]
    }))
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(uglify())
    .pipe(gulp.dest(assetsPath+'/js'))
    .pipe(notify({ message: 'Scripts compiled' }))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function(){
  browserSync.init({
    reloadDelay: 1000,
    open: false
  });
});

// Rerun the task when a file changes
//
gulp.task('watch', function() {

  gulp.watch('_images/**/*', {cwd: assetsPath}, ['images']);
  gulp.watch('_sass/**/*.scss', {cwd: assetsPath}, ['styles']);
  gulp.watch(assetsPath+'/**/*{.html,.php,.slim,.rb}').on('change', browserSync.reload);
  gulp.watch([assetsPath+'/_scripts/**/*.js', '!'+assetsPath+'/Javascripts/script.min.js'], ['scripts']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'styles', 'scripts', 'images', 'browser-sync', 'watch']);

// The default task (called when you run `gulp` from cli)
gulp.task('build', [ 'styles', 'scripts']);
