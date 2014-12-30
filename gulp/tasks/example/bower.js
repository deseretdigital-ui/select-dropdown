var gulp = require('gulp');

gulp.task('example/bower', function () {
  var config = {
    src: ['./bower_components/jquery/jquery.min.js'],
    dest: './example/build'
  };

  return gulp.src(config.src).pipe(gulp.dest(config.dest));
});
