import { join } from 'path'
import { TSRollupConfig, readdir, clean, ebuild, copyFiles, watcher, RollupConfigOutput, esbuild } from 'aria-build'
import { inlineTemplateTransform } from 'custom-elements-ts/plugins/inline-template-plugin'

(async function() {
  
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

  const output: RollupConfigOutput = {
    format: 'umd',
    globals: {
      'custom-elements-ts': 'customElementsTs',
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs.operators'
    }
  }

  async function getSources(src: string) {
    const folders = await readdir(src)
    return folders.map(folder => join(src, folder, 'src', 'index.ts'))
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
    esbuild({ config: options, esbuild: true }),
    copyFiles([ 
      './src/*', 
      './src/assets/**/*'
    ], 'dist'),
    watcher('./src', { 
      async onReady(files: string[]) {
        console.log(`> Initial scan complete. Ready for changes. Total files: ${files.length}`)
        await import('./server')
      },
      async onChange(file: string, stats: import('fs').Stats) {
        console.log(`File: ${file} was changed.`)
        const option = options.find(option =>  
          file.includes((option.output as RollupConfigOutput).name))
        
        option && await ebuild({ config: option })
      }
    })
  ])
})()