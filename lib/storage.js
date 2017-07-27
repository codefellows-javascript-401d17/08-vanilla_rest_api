'use strict';

exports.storageAll = {};

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  if(!schemaName) return Promise.reject(new Error('no schemaName given'));
  if(!item) return Promise.reject(new Error('no item given'));
  if(!exports.storageAll[schemaName]) exports.storageAll[schemaName] = {};

  exports.storageAll[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = (schemaName, id) => {
  return new Promise((result, reject) => {
    if(!schemaName) return reject(new Error('no schemaName given'));
    if(!id) return reject(new Error('no item given'));
    if(!exports.storageAll[schemaName]) return reject(new Error('schemaName not found'));
    if(!exports.storageAll[schemaName][id]) return reject(new Error('bad id given'));
    result(exports.storageAll[schemaName][id]);
  });
};
