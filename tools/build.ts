import { TSRollupConfig, readdir, clean, build, copyFiles, watcher } from 'aria-build'
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

  const [ elements, libs ] = await Promise.all([
    getSources('./src/elements'),
    getSources('./src/libs'),
  ])

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
    }
  ]

  await clean('dist')
  await Promise.all([
    build({
      input: './node_modules/custom-elements-ts/esm2015/custom-elements-ts.js',
      output: {
        format: 'umd',
        name: 'customElementsTs',
        file: './node_modules/custom-elements-ts/bundles/custom-elements-ts.js'
      }
    }),
    build(options),
    copyFiles('./src/*', 'dist'),
    copyFiles('./src/assets/**/*', 'dist')
  ])

  /// TODO: uncomment later
  // await watcher('./src', { 
  //   async onReady(files: string[]) {
  //     console.log(`> Initial scan complete. Ready for changes. Total files: ${files.length}`)
  //     await import('./server')
  //   },
  //   async onChange(file: string, stats: import('fs').Stats) {
  //     console.log(`File: ${file} was changed.`)
  //     const option = options.find(option => file.includes(option.output.name))
  //     option && await build(option)
  //   }
  // })
})()