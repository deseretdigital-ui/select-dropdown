var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
  var config = {
    src: [
      './example/build'
    ]
  };

  del(config.src);
});
