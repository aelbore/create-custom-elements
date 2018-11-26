const { basename, join, dirname, sep, resolve } = require('path');

const { TaskConfig  } = require('@ngx-devtools/task');
const { readFileAsync, writeFileAsync, copyFileAsync, mkdirp } = require('@ngx-devtools/common');
const { buildProdApp } = require('@ngx-devtools/build');

const libsFiles = [
  "node_modules/@webcomponents/custom-elements/src/native-shim.js",
  "node_modules/core-js/client/shim.min.js",
  "node_modules/zone.js/dist/zone.min.js"
];

const APP_BUNDLES = [
  `<script src="ar-input/bundles/ar-input.umd.min.js"></script>`, 
  `<script src="main/bundles/main.umd.js"></script>`, 
  `<script src="profile-card/bundles/profile-card.umd.min.js"></script>`
]

const ENTRY_POINT_HTML = join('dist', 'index.html');
const POLYFILLS_PATH = join('dist', 'polyfills'); 

class GulpFileTask extends TaskConfig {
  constructor() {
    super();
  }
  
  cleanAll() {
    return Promise.all([ this.cleanDist(), this.cleanTmp() ]);
  }

  copyLibs() {
    return Promise.all(libsFiles.map(libsFile => {
      const destFile = join(POLYFILLS_PATH, basename(libsFile));
      mkdirp(dirname(destFile));
      return copyFileAsync(libsFile, destFile);
    }))
  }

  attachScripts() {
    return readFileAsync(ENTRY_POINT_HTML, 'utf8')
      .then(async content => {
        const scripts = libsFiles
          .map(libsFile => `<script src="polyfills/${basename(libsFile)}"></script>`)
          .concat(APP_BUNDLES)
        const contents = content.replace('<!-- scripts -->', scripts.join('\n\t\t'));
        return writeFileAsync(ENTRY_POINT_HTML, contents);
      })
  }

  bundle() {
    return this.cleanAll()
      .then(() => Promise.all([ buildProdApp(), this.build() ]))
      .then(() => Promise.all([ this.copyLibs(), this.attachScripts() ]))
  }

}

GulpFileTask.registerTasks();