## Che-Ban-De Boilerplate
#### 就是只切版用的

## Tool

- [Pug](https://pugjs.org/api/getting-started.html)
- [Sass](https://sass-lang.com/)

## Dev Tool
- [gulp](https://gulpjs.com/)

### Feature
- Hot reload
- package `*.pug` & `*.sass` to `*.html`, `*.css`

## ENV
- node(v8.9.3), npm(v5.5.1)

## Usage

### With npm scripts
- `npm run build` : package all files to dist.
- `npm run dev` : livereload and present result with browserSync.

### With gulp
```
gulp.task('clean', clean);
gulp.task('watch', watch);
gulp.task('styles', styles);
gulp.task('pugs', pugs);
gulp.task('images', images);

gulp.task('serve', ['styles', 'pugs', 'images'], serve);
gulp.task('build', ['clean', 'styles', 'pugs', 'images']);
gulp.task('default', ['build']);
```
