var request = require('http').request;
var routine = require('promise-routine');
var Promise = require('any-promise');

module.exports = function npmPlugin(input) {
  var getStatus = function getStatus(name) {
    return new Promise(function(resolve) {
      request('http://registry.npmjs.org/' + name, function(resp) {
        var collection = [];
        resp.on('data', function(chunk) {
          collection.push(chunk);
        });

        resp.on('end', function() {
          var data = Buffer.concat(collection);
          resolve(['npm', name, JSON.parse(data)._id ? 'taken' : 'free']);
        });
      }).end();
    });
  };

  return routine(getStatus, input);
};
