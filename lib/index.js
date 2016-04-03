'use strict';

const plugin = require('hmu-plugin')('npm');
const c = plugin.c;

module.exports = function npm(packs) {
  packs.forEach(pack => {
    plugin.status(`http://registry.npmjs.org/${pack}`, 404)
    .then(free => {
      plugin.log(`${pack} ${free ? c.green('free') : c.red('taken')}`);
    }, plugin.error);
  });
};
