var got = require('got')
var pull = require('pull-stream')
var values = pull.values
var asyncMap = pull.asyncMap
var collect = pull.collect

module.export = hmuNpm

var JSONOPTS = { json: true }

function hmuNpm (pkgs, options, callback) {
  var get = _httpsGet
  if (options.http) get = _httpGet
  var registry = (options.http ? 'http://' : 'https://') + 'registry.npmjs.org/'

  pull(
    values(pkgs),
    asyncMap(function (pkg, done) {
      got(registry + pkg + '/latest', JSONOPTS).then(function (res) {
        var isTaken = res.statusCode === 200 && !res.body.unpublished
        done(null, pkg + ' ' + (isTaken ? 'taken' : 'free'))
      }, done)
    }),
    collect(callback)
  )
}
