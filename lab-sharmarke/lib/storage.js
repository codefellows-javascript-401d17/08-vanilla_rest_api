'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemeName, item) {
  if (!schemeName)  return Promise.reject(new Error('expected scheme name'));
  if (!item) return Promise.reject(new Error('expected item'));
  if (!storage[schemeName]) storage[schemeName] = {};

  storage[schemeName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemeName, id) {
  return new Promise((resolve, reject) => {
    if (!schemeName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    var schema = storage[schemeName];
    if (!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if (!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schemeName, id) {
  return new Promise((resolve, reject) => {
    if (!schemeName) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));

    var schema = storage[schemeName];
    if(!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if (!item) return reject(new Error('item not found'));

    delete storage[schemeName][id];
    resolve();
  });
};
