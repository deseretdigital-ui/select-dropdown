var gulp = require('gulp');

gulp.task('example/dist', function () {
  var config = {
    src: ['./src/select-dropdown.js'],
    dest: './example/build/bower_components/select-dropdown/src'
  };

  return gulp.src(config.src).pipe(gulp.dest(config.dest));
});
