var storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  return new Promise(function(resolve, reject) {
    //account for missing params
    if(!schemaName) return reject(new Error('must provide schemaName param'));
    if(!item) return reject(new Error('must provide item param'));

    //if no model key, assign model key as empty object
    if(!storage[schemaName]) {
      storage[schemaName] = {};
    }

    //assign created item to storage
    storage[schemaName][item.id] = item;
    resolve(item);
  }); 
};

exports.fetchItem = function(schemaName, id) {
  return new Promise(function(resolve, reject) {
    //account for missing params
    if(!schemaName) return reject(new Error('must provide schemaName param'));
    if(!id) return reject(new Error('must provide id param'));


    var schema = storage[schemaName];
    if(!schema) return reject(new Error(`provided schemaName ${schemaName} was not found in storage`));

    var item =  schema[id];
    if(!item) return reject(new Error('item not found in schema at provided id: ', id));
    resolve(item);
  });
};