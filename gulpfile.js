const { TaskConfig  } = require('@ngx-devtools/task');

class GulpFileTask extends TaskConfig {
  constructor() {
    super();
  }
  cleanAll() {
    return Promise.all([ this.cleanDist(), this.cleanTmp() ]);
  }
}

GulpFileTask.registerTasks(require('gulp'));
