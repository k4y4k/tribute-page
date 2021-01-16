/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */

import gulp from 'gulp'
const gulpPug = require('gulp-pug')
const postcss = require('gulp-postcss')
const responsive = require('gulp-responsive')
const ts = require('gulp-typescript')

function pug(done: Function): any {
  gulp.src('./src/pug/*.pug').pipe(gulpPug()).pipe(gulp.dest('./dist'))

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
    .src('./src/img/*.png')
    .pipe(
      responsive({
        'header.png': [
          {
            format: 'webp',
            height: 500,
            trim: 10,
            quality: 95,
            rename: 'header-sm.webp',
          },
          {
            format: 'png',
            height: 500,
            trim: 10,
            quality: 95,
            rename: 'header-sm.png',
          },

          {
            format: 'webp',
            height: 750,
            trim: 10,
            quality: 95,
            rename: 'header-md.webp',
          },
          {
            format: 'png',
            height: 750,
            trim: 10,
            quality: 95,
            rename: 'header-md.png',
          },

          {
            format: 'webp',
            height: 1000,
            trim: 10,
            quality: 95,
            rename: 'header-lg.webp',
          },
          {
            format: 'png',
            height: 1000,
            trim: 10,
            quality: 95,
            rename: 'header-lg.png',
          },
          {format: 'webp', trim: 10, quality: 95, rename: 'header-xl.webp'},
          {format: 'png', trim: 10, quality: 95, rename: 'header-xl.png'},
        ],
      })
    )
    .pipe(gulp.dest('./dist/img/'))

  done()
}

function js(done: Function): any {
  gulp
    .src('./src/ts/*.ts')
    .pipe(ts({noImplicitAny: true, outFile: 'main.js'}))
    .pipe(require('gulp-minify')({noSource: true}))
    .pipe(gulp.dest('./dist/js/'))

  done()
}

function meta(done: Function): any {
  gulp.src('./src/meta/*').pipe(gulp.dest('./dist'))

  done()
}

console.log(img, js, meta, processCss)

exports.build = gulp.series(meta, pug, processCss, img, js)
