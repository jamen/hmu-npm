var test = require('tape');
var nock = require('nock');
var hmu = require('hmu-core');
var npm = require('.');

test('single name', function(t) {
  t.plan(1);

  nock('https://registry.npmjs.org')
  .get('/foobar')
  .reply(200, {
    _id: 'foobar'
  });

  hmu([{
    plugin: npm,
    input: ['foobar']
  }]).then(function(results) {
    t.same(results, [
      ['npm', 'foobar', 'taken']
    ], 'name is taken');
  });
});

test('multiple name', function(t) {
  t.plan(1);

  nock('https://registry.npmjs.org')
  .get('/bazqux')
  .reply(404, {});

  nock('https://registry.npmjs.org')
  .get('/foobar')
  .reply(200, {
    _id: 'foobar'
  });

  hmu([{
    plugin: npm,
    input: ['bazqux', 'foobar']
  }]).then(function(results) {
    t.same(results, [
      ['npm', 'bazqux', 'free'],
      ['npm', 'foobar', 'taken']
    ], 'name is taken');
  });
});
