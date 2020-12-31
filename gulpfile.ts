import {series} from 'gulp'

// [def]ault
function def(done) {
  console.log('this is the default task')

  series(pug)
  done()
}

const pug = (done: Function) => {
  console.log('transpiling Pug to HTML')

  done()
}

export default def
