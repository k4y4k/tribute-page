const gulp = require('gulp')
const gulpPug = require('gulp-pug')
const postcss = require('gulp-postcss')
const responsive = require('gulp-responsive')
const ts = require('gulp-typescript')

function pug(done) {
  gulp.src('./src/pug/*.pug').pipe(gulpPug()).pipe(gulp.dest('./dist'))

  done()
}

function processCss(done) {
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

function img(done) {
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

function meta(done) {
  gulp.src('./src/meta/*').pipe(gulp.dest('./dist'))

  done()
}

exports.build = gulp.series(meta, pug, processCss, img)
