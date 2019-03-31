const inlineTemplateTransform = require('rollup-plugin-inline-custom-elements-ts')

module.exports = {
  rollupPlugins: [
    inlineTemplateTransform()
  ]
}