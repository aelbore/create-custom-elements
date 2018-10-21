module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      { pattern: 'base.spec.ts' }, 
      { pattern: 'src/elements/**/!(index|*.stories)*.ts' }
    ],

    proxies: {
    },

    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },

    karmaTypescriptConfig: {
      exclude: [
        'cypress', 
        'src/*(apps)',
        '**/*.stories.ts'
      ],
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [ require('./karma-transform') ],
      },
      compilerOptions: {
        rootDir: 'elements',
        skipLibCheck: true,
        lib: ['ES2015', 'DOM']
      },
      coverageOptions: {
        exclude: /((.*\.(spec|module))|index)\.ts/
      },
      reports: {
        "html": {
          "directory": "coverage",
          "subdirectory": "."
        },
        "text-summary": ""
      },
    },

    reporters: ['mocha', 'karma-typescript'],

    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
  });
};
