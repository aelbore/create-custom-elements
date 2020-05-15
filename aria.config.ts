const inlineTemplateTransform = require('rollup-plugin-inline-custom-elements-ts')

export default {
  test: {
    plugins: {
      before: [ inlineTemplateTransform() ]
    },
    output: {
      globals: {
        'custom-elements-ts': 'customElementsTs',
        'rxjs': 'rxjs'
      }
    },
    scripts: [
      './node_modules/rxjs/bundles/rxjs.umd.min.js',
      './node_modules/custom-elements-ts/bundles/custom-elements-ts.js',
    ]
  }
}