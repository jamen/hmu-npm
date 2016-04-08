'use strict';

const plugin = require('hmu-plugin')('npm');
const routine = require('promise-routine');
const c = plugin.c;

module.exports = function npm(packs) {
  return routine(plugin.status, packs.map(n => [`http://registry.npmjs.org/${n}`, 404]), plugin)
  .then(statuses => {
    packs.forEach((pack, i) => {
      const free = statuses[i];
      plugin.log(`${pack} ${free ? c.green('free') : c.red('taken')}`);
    });
  }, plugin.error);
};
