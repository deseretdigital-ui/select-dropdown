var gulp = require('gulp');

gulp.task('example/bower', function () {
  var config = {
    src: ['./bower_components/jquery/jquery.min.js'],
    dest: './example/build/bower_components'
  };

  return gulp.src(config.src, { base: './bower_components' }).pipe(gulp.dest(config.dest));
});
