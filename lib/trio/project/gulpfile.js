'use strict';
var fs = require('fs');
var path         = require('path');
var assets_path  = path.normalize('{{ trio }}'),
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
    changed      = require('gulp-changed'),
    postcss      = require('gulp-postcss'),
    sprites      = require('postcss-sprites'),
    cssnano      = require('cssnano'),
    clearfix     = require('postcss-clearfix'),
    sassGlob     = require('gulp-sass-glob'),
    imagemin     = require('gulp-imagemin'),
    browserSync  = require('browser-sync').create(),
    changedInPlace = require('gulp-changed-in-place'),
    autoprefixer = require('autoprefixer'),
    processors   = [
      clearfix,
      autoprefixer({browsers: ['last 2 version']}),
      cssnano
    ];

gulp.task('styles', function () {
  gulp.src(assets_path + '/_sass/screen.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(assets_path + '/css'))
    .pipe(notify('Sass compiled'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src(assets_path+'/_images/**/*{jpg,png,gif,svg}')
    .pipe(newer(assets_path+'/img'))

    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest(assets_path+'/img'));
});

gulp.task('scripts', function() {

  gulp.src(assets_path+'/_scripts/*.js')
    .pipe(include({
      includePaths: [
        __dirname+"/bower_components",
        assets_path+"/_scripts",
      ]
    }))
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(uglify())
    .pipe(gulp.dest(assets_path+'/js'))
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
gulp.task('watch', function() {

  gulp.watch('_images/**/*', {cwd: assets_path}, ['images']);
  gulp.watch('_sass/**/*.scss', {cwd: assets_path}, ['styles']);
  gulp.watch(assets_path+'/**/*{.html,.php,.slim,.rb}').on('change', browserSync.reload);
  gulp.watch([assets_path+'/_scripts/**/*.js', '!'+assets_path+'/Javascripts/script.min.js'], ['scripts']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'styles', 'scripts', 'images', 'browser-sync', 'watch']);

// The default task (called when you run `gulp` from cli)
gulp.task('build', [ 'styles', 'scripts']);
