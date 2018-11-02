module.exports = {
  external: [
    'rxjs',
    'rxjs/operators'
  ],
  output: {
    globals: {
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs.operators'
    }
  }
}