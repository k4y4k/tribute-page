import gulp from 'gulp'

var gulpPug = require('gulp-pug')

function transpile(done: Function): any {
  gulp
    .src('./src/pug/*.pug')
.pipe(gulpPug({pretty: false, verbose: true}))
    .pipe(gulp.dest('./dist'))

  done()
}

exports.build = gulp.series(transpile)
