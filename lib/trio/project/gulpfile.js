'use strict';

var assets_path  = __dirname+'/source/trio',
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    wait         = require('gulp-wait'),
    newer        = require('gulp-newer'),
    watch        = require('gulp-watch'),
    notify       = require('gulp-notify'),
    include      = require('gulp-include'),
    postcss      = require('gulp-postcss'),
    sprites      = require('postcss-sprites'),
    clearfix     = require('postcss-clearfix'),
    imagemin     = require('gulp-imagemin'),
    sassGlob     = require('gulp-sass-glob'),
    browserSync  = require('browser-sync').create(),
    autoprefixer = require('autoprefixer'),
    processors   = [
      clearfix,
      autoprefixer({browsers: ['last 2 version']}),
      sprites({
        stylesheetPath  : assets_path+'/css',
        spritePath      : assets_path+'/img/icons.png',
        retina          : true,
        outputDimensions: true,
        filterBy        : function(image) {
            return /^icon/gi.test(image.url);
        },
      })
    ];

gulp.task('styles', function() {

  gulp.src(assets_path+'/_sass/*.scss')
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: [
      __dirname+"/bower_components",
      assets_path+"/_styles",
      ]
    }))
    .pipe(postcss(processors))
    .on('error', console.log)
    .pipe(gulp.dest(assets_path+'/css'))
    .pipe(wait(2000))
    .pipe(browserSync.stream());

});

gulp.task('images', function() {
  gulp.src(assets_path+'/_images/**/*')
    .pipe(newer(assets_path+'/img'))
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest(assets_path+'/img'));
});

// gulp.task('images', function() {
//     watch(assets_path+'/_images/**/*', function (files) {
//       files.pipe(imagemin({
//         progressive: true,
//         interlaced: true
//       }))
//       .pipe(gulp.dest(assets_path+'/img'));
//     });
// });

gulp.task('scripts', function() {

  gulp.src(assets_path+'/_scripts/*.js')
    .pipe(include({
      includePaths: [
        __dirname+"/bower_components",
        assets_path+"/_scripts",
      ]
    }))
    .on('error', console.log)
    .pipe(gulp.dest(assets_path+'/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(browserSync.stream({match: assets_path+'/js'}));
});

gulp.task('browser-sync', function(){
  browserSync.init({
     proxy: "localhost:4567",
     reloadDelay: 2000
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {

  watch(assets_path+'/_images/**/*', function() {
    gulp.start('images');
  });

  gulp.watch(assets_path+'/_sass/**/*.scss', ['styles']);
  gulp.watch(assets_path+'/_scripts/**/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('**/*.slim').on('change', browserSync.reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'styles', 'scripts', 'browser-sync', 'images', 'watch']);

// The default task (called when you run `gulp` from cli)
gulp.task('build', [ 'styles', 'scripts']);
