'use strict';

const plugin = require('hmu-plugin')('npm');
const c = plugin.c;

module.exports = function npm(packs) {
  plugin.title();
  packs.forEach(pack => {
    plugin.status(`http://registry.npmjs.org/${pack}`, 404)
    .then(available => {
      plugin.log(`${pack} ${available ? c.green('available') : c.red('taken')}`);
    }, plugin.error);
  });
};
