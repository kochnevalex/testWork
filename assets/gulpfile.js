'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const bs = require('browser-sync').create();
const csscomb = require('gulp-csscomb');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const spritesmith = require("gulp-spritesmith");
const gulpif = require("gulp-if");
const flexibility = require('postcss-flexibility');

gulp.task('serve', function () {

  bs.init({
    proxy: "http://localhost:63342/assets/basetheme-design/",
    port: 63342,
    ui: {
      port: 63342
    }
  });

  gulp.watch("css/*.css").on('change', bs.reload);
  gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('sass', function (callback) {
  return gulp.src('css/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'sass:'}))
    .pipe(postcss([flexibility]))
    .pipe(autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12'
      ],
      cascade: true
    }))
    .pipe(debug({title: 'prefx:'}))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(debug({title: 'maps:'}))
    .pipe(csscomb())
    .pipe(gulp.dest('css'));
  callback();
});

gulp.task('templates', function (callback) {
  gulp.src('jade/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('.'))
    .pipe(debug({title: 'jade:'}));
  callback();
});

gulp.task('imagemin', () =>
  gulp.src('images/nonoptimised/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'))
);

gulp.task('sprites', () =>
  gulp.src('images/sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      styleName: 'sprite.css',
      imgPath: 'images/sprite.png'
    }))
    .pipe(gulpif('*.png', gulp.dest('images/nonoptimised/')))
    .pipe(gulpif('*.css', gulp.dest('css/')))
);

gulp.task('watch', function () {
  gulp.watch('css/sass/**/*.*', ['sass']);
  gulp.watch('jade/**/*.*', ['templates']);
  gulp.watch('images/nonoptimised/*.*', ['imagemin']);
  gulp.watch('images/sprite/*.*', ['sprites']);
});

gulp.task('default', ['templates', 'sass', 'imagemin', 'sprites', 'serve', 'watch']);