var test = require('tape');
var nock = require('nock');
var hmu = require('hmu-core');
var npm = require('.');

test('single name', function(t) {
  t.plan(1);

  nock('https://registry.npmjs.org').get('/foobar').reply(200, {_id: 'foobar'});
  nock('https://registry.npmjs.org').get('/bazqux').reply(404, {});

  hmu([{
    plugin: npm,
    input: ['foobar', 'bazqux']
  }]).then(function(results) {
    t.same(results, [
      ['npm', 'foobar', 'taken'],
      ['npm', 'bazqux', 'free']
    ], 'correct output');
  });
});
