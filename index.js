var request = require('request');
var routine = require('promise-routine');
var Promise = require('any-promise');

module.exports = function npmPlugin(input) {
  var getStatus = function getStatus(name) {
    return new Promise(function(resolve) {
      request('http://registry.npmjs.org/' + name, function(_, data) {
        resolve(['npm', name, JSON.parse(data.body)._id ? 'taken' : 'free']);
      });
    });
  };

  return routine(getStatus, input);
};
