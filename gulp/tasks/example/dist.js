var gulp = require('gulp');

gulp.task('example/dist', function () {
  var config = {
    src: ['./src/select-dropdown.js'],
    dest: './example/build'
  };

  return gulp.src(config.src).pipe(gulp.dest(config.dest));
});
