/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */

import gulp from 'gulp'
const gulpPug = require('gulp-pug')
const postcss = require('gulp-postcss')
const responsive = require('gulp-responsive')
const webpack = require('webpack-stream')

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

  // .riv for Rive
  // seperate pass because it's a straight copy/paste job
  gulp.src('./src/img/*.riv').pipe(gulp.dest('./dist/img/'))

  done()
}

function tsToJs(done: Function): any {
  gulp
    .src('./src/ts/index.ts')
    .pipe(webpack(require('./webpack.config.ts')))
    .pipe(gulp.dest('./dist/js/'))

  done()
}

function meta(done: Function): any {
  gulp.src('./src/meta/*').pipe(gulp.dest('./dist'))

  done()
}

function animAssets(done: Function): any {
  gulp.src('./src/anim/assets/**/*.*').pipe(gulp.dest('./dist/assets/'))
  done()
}

exports.build = gulp.series(meta, pug, processCss, img, animAssets, tsToJs)
