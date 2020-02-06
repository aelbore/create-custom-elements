const inlineTemplateTransform = require('rollup-plugin-inline-custom-elements-ts')

export default {
  test: {
    plugins: {
      before: [ inlineTemplateTransform() ]
    },
    external: [ 
      'custom-elements-ts',
      'rxjs',
      'rxjs/operators'
    ],
    output: {
      name: 'createCustomElements',
      globals: {
        'custom-elements-ts': 'customElementsTs',
        'rxjs': 'rxjs',
        'rxjs/operators': 'rxjs.operators'
      }
    },
    scripts: [
      './node_modules/rxjs/bundles/rxjs.umd.min.js',
      './dist/custom-elements-ts.js',
    ]
  }
}