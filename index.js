var request = require('http').request;
var routine = require('promise-routine');
var Promise = require('any-promise');

module.exports = function npmPlugin(input) {
  return routine(function getStatus(name) {
    return new Promise(function(resolve) {
      request('http://registry.npmjs.org/' + name, function(resp) {
        var res = '';
        resp.on('data', function(chunk) {
          res += chunk;
        });

        resp.on('end', function() {
          var json = JSON.parse(res);
          var k = Object.keys(json.time || {});
          var hasProperty = k.indexOf('unpublished') > -1 || k.length === 0;
          resolve(['npm', name, (hasProperty ? 'free' : 'taken')]);
        });
      }).end();
    });
  }, input);
};
