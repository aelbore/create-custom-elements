module.exports = {
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/elements',
    'rxjs',
    'rxjs/operators'
  ],
  output: {
    globals: {
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs.operators',
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/compiler': 'ng.compiler',
      '@angular/elements': 'ng.elements',
      "@angular/platform-browser": "ng.platformBrowser",
      "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
    }
  }
}