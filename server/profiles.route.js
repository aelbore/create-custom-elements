const { RouterFactory, HTTP_METHOD } = require('@ngx-devtools/server');

module.exports = RouterFactory.create({
  path: '/profiles',
  method: HTTP_METHOD.GET,
  handler (req, res, next) {
    const profiles = require('./profiles.json')
    return res.status(200).json(profiles);
  }
});