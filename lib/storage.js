'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!item) return Promise.reject(new Error('expected item'));
  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = (schemaName, id) => {
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('expected schemaName'));
    if(!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('scheme not found'));

    var item = schema[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.removeItem = (schemaName, id) => {
  if(!schemaName) return Promise.reject(new Error('no schemaName given'));
  if(!id) return Promise.reject(new Error('no id given'));

  let storeSchema = storage[schemaName];
  if(!storeSchema) return Promise.reject(new Error('no item found'));

  delete storeSchema.id;
  return Promise.resolve();
};

exports.updateItem = (schemaName, id, content) => {
  if(!schemaName) return Promise.reject(new Error('no schemaName given'));
  if(!id) return Promise.reject(new Error('no id given'));
  if(!content) return Promise.reject(new Error('no content given'));

  let storeSchema = storage[schemaName];
  if(!storeSchema) return Promise.reject(new Error('no item found'));

  storeSchema.name = content.name;
  storeSchema.content = content.content;
  return Promise.resolve(storeSchema);
};
