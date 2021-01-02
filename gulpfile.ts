import gulp from 'gulp'
const gulpPug = require('gulp-pug')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

function pug(done: Function): any {
  gulp
    .src('./src/pug/*.pug')
    .pipe(gulpPug({verbose: true}))
    .pipe(gulp.dest('./dist'))

  done()
}

function css(done: Function): any {
  const plugins = [autoprefixer()]
  gulp
    .src('./src/css/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css/'))
  done()
}

exports.build = gulp.series(pug, css)
