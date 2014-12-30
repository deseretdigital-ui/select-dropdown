var gulp = require('gulp');
var ghpages = require('gulp-gh-pages');

gulp.task('ghpages', ['example'], function () {
  var config = {
    src: './example/**/*'
  };

  return gulp.src(config.src).pipe(ghpages());
});
