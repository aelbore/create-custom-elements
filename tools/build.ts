import { TSRollupConfig, readdir, clean, build, copyFiles } from 'aria-build'
import { join } from 'path'

(async function() {
  const inlineTemplateTransform = require('rollup-plugin-inline-custom-elements-ts')

  const inputOptions = {
    external: [ 
      'custom-elements-ts',
      'rxjs',
      'rxjs/operators'
    ],
    plugins: {
      before: [ inlineTemplateTransform() ]
    }
  }

  const output = {
    format: 'umd',
    globals: {
      'custom-elements-ts': 'customElementsTs',
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs.operators'
    }
  }

  async function getSources(src: string) {
    const folders = await readdir(src)
    return folders.map(folder => {
      return join(src, folder, 'src', 'index.ts') 
    })
  }

  const elements = await getSources('./src/elements')
  const libs = await getSources('./src/libs')

  const options: TSRollupConfig[] = [
    {
      input: './src/app/index.ts',
      ...inputOptions,
      output: {
        file: './dist/main.js',
        name: 'main',
        ...output
      } 
    },
    {
      input: elements,
      ...inputOptions,
      output: {
        name: 'elements',
        file: './dist/elements.js',
        ...output
      } 
    },
    {
      input: libs,
      ...inputOptions,
      output: {
        name: 'libs',
        file: './dist/libs.js',
        ...output
      } 
    },
    {
      input: './node_modules/custom-elements-ts/esm2015/custom-elements-ts.js',
      output: {
        format: 'umd',
        name: 'customElementsTs',
        file: './dist/custom-elements-ts.js'
      }
    }
  ]

  await clean('dist')
  await Promise.all([
    build(options),
    copyFiles('./src/*', 'dist'),
    copyFiles('./src/assets/**/*', 'dist')
  ])
})()