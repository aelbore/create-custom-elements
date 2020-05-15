import { dirname } from 'path'
import { build, clean, ebundle, TSRollupConfig }  from 'aria-build'

(async function() {
  
  const options: TSRollupConfig = {
    input: './node_modules/custom-elements-ts/esm2015/custom-elements-ts.js',
    output: {
      format: 'umd',
      name: 'customElementsTs',
      file: './node_modules/custom-elements-ts/bundles/custom-elements-ts.js'
    }
  }

  // await clean(dirname(options.output.file))
  // await build(options)
})()