var gulp = require('gulp');

gulp.task('watch', ['example'], function () {
  gulp.watch([
    './src/**/*',
    './example/src/**/*'
  ], ['example']);
});
