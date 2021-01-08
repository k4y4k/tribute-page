/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */

import gulp from 'gulp'
const gulpPug = require('gulp-pug')
const postcss = require('gulp-postcss')
const responsive = require('gulp-responsive')
const ts = require('gulp-typescript')

function pug(done: Function): any {
  gulp
    .src('./src/pug/*.pug')
    .pipe(gulpPug({verbose: true}))
    .pipe(gulp.dest('./dist'))

  done()
}

function processCss(done: Function): any {
  const plugins = [
    require('postcss-partial-import'),
    require('postcss-uncss')({html: ['./dist/index.html']}),
    require('autoprefixer')(),
    require('cssnano')({preset: 'advanced'}),
  ]
  gulp
    .src('./src/css/main.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css/'))
  done()
}

function img(done: Function): any {
  gulp
    .src('./src/img/*.{png,jpg}')
    .pipe(
      responsive({
        'header.png': [
          {format: 'webp', height: 750},
          {format: 'png', height: 750},
        ],
      })
    )
    .pipe(gulp.dest('./dist/img/'))

  done()
}

function js(done: Function): any {
  console.log('typescript')

  gulp
    .src('./src/ts/*.ts')
    .pipe(ts({noImplicitAny: true, outFile: 'main.js'}))
    .pipe(gulp.dest('./dist/js/'))

  done()
}

exports.build = gulp.series(pug, processCss, img, js)
