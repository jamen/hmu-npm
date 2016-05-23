var request = require('http').request;
var routine = require('promise-routine');
var Promise = require('any-promise');

module.exports = function npmPlugin(input) {
  return routine(function getStatus(name) {
    return new Promise(function(resolve) {
      request('http://registry.npmjs.org/' + name, function(resp) {
        resolve(['npm', name, resp.statusCode === 200 ? 'taken' : 'free']);
      }).end();
    });
  }, input);
};
