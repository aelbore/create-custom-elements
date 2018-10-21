const { join, dirname } = require('path');
const { inlineResourcesFromString } = require('@ngx-devtools/common');

module.exports = function (context, callback) {
  if (!context.ts) {
    return callback(undefined, false);
  }
  context.ts.transpiled = inlineResourcesFromString(context.ts.transpiled, url => join(dirname(context.filename), url));
  return callback(undefined, true, false);
};
