var storage = {};

module.exports = exports = {};

exports.createItem = function (schemaName, item) {
  return new Promise(function (resolve, reject) {
    //account for missing params
    if (!schemaName) return reject(new Error('must provide schemaName param'));
    if (!item) return reject(new Error('must provide item param'));

    //if no model key, assign model key as empty object
    if (!storage[schemaName]) {
      storage[schemaName] = {};
    }

    //assign created item to storage
    storage[schemaName][item.id] = item;
    resolve(item);
  });
};

exports.fetchItem = function (schemaName, id) {
  return new Promise(function (resolve, reject) {
    //account for missing params
    if (!schemaName) return reject(new Error('must provide schemaName param'));
    if (!id) return reject(new Error('must provide id param'));

    //get schema
    var schema = storage[schemaName];
    if (!schema) return reject(new Error(`provided schemaName ${schemaName} was not found in storage`));

    //get item from schema, resolve
    var item = schema[id];
    if (!item) return reject(new Error('item not found in schema at provided id: ', id));
    resolve(item);
  });
};

exports.deleteItem = function (schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('must provide schemaName param'));
  if (!id) return Promise.reject(new Error('must provide id param'));

  var schema = storage[schemaName];
  console.log('storage.js 44', schema);
  if (!schema) return Promise.reject(new Error(`provided schema name ${schemaName} was not found in storage`));

  //remove item from schema, resolve
  var item = schema[id];
  if (!item) return Promise.reject(new Error('item not found in schema at provided id,  ', id));
  storage[schemaName] = {};
  console.log(storage);
  Promise.resolve(storage[schemaName]);
}