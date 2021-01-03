import gulp from 'gulp'
const gulpPug = require('gulp-pug')
const postcss = require('gulp-postcss')
const responsive = require('gulp-responsive')

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
  console.log('images')

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

exports.build = gulp.series(pug, processCss, img)
