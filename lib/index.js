'use strict';

const plugin = require('hmu-plugin')('npm');

module.exports = function npm(packs) {
  packs.forEach(pack => {
    plugin.status(`http://registry.npmjs.org/${pack}`, 404)
    .then(available => plugin.log(available ? 'available' : 'taken'), plugin.error);
  });
};
