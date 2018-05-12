const path = require('path');
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpPlumber = require('gulp-plumber');
const gulpPug = require('gulp-pug');
const gulpClean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const resolvePath = filePath => path.resolve(__dirname, filePath);

const serve = () => {
  browserSync.init({
    server: resolvePath('dist/'),
  });
  gulp
    .watch(resolvePath('src/**/*.sass'), ['styles'])
    .on('change', browserSync.reload);
  gulp
    .watch(resolvePath('src/img/**/*'), ['images'])
    .on('change', browserSync.reload);
  gulp
    .watch(resolvePath('src/**/*.pug'), ['pugs'])
    .on('change', browserSync.reload);
};

const watch = () => {
  gulp.watch(resolvePath('src/**/*.sass'), ['styles']);
  gulp.watch(resolvePath('src/**/*.pug'), ['pugs']);
  gulp.watch(resolvePath('src/img/**/*'), ['images']);
};

const images = () => gulp
  .src(resolvePath('src/img/**/*'))
  .pipe(gulp.dest(resolvePath('dist/img')));

const styles = () => gulp
  .src(resolvePath('src/sass/*.sass'))
  .pipe(gulpPlumber())
  .pipe(gulpSass())
  .pipe(gulp.dest('dist'));

const pugs = () => gulp
  .src([
    resolvePath('src/pages/*.pug'),
  ])
  .pipe(gulpPlumber())
  .pipe(gulpPug({
    pretty: true,
  }))
  .pipe(gulp.dest(resolvePath('dist')));

const clean = () => gulp
  .src(resolvePath('dist/**/*'), { read: false })
  .pipe(gulpPlumber())
  .pipe(gulpClean());


gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('styles', styles);
gulp.task('pugs', pugs);
gulp.task('images', images);

gulp.task('serve', ['styles', 'pugs', 'images'], serve);
gulp.task('build', ['clean', 'styles', 'pugs', 'images']);
gulp.task('default', ['build']);
