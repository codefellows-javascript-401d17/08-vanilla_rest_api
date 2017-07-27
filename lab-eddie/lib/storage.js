'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(category, item) {
  if(!category) return Promise.reject(new Error(`Expecte category`));
  if(!item) return Promise.reject(new Error('Expected item'));
  if(!storage[category]) storage[category] = {};

  storage[category][item.id] = item;
  return Promise.resolve(item);
}

exports.fetchItem = function(category, id) {
  return new Promise((resolve, reject) => {
    if(!category) return Promise.reject(new Error(`Expecte category`));
    
    var cat = storage[category];
    if(!cat) return reject(new Error('Category not found'));
    if(!id) return resolve(Object.keys(cat))

    var item = cat[id]
    if(!item) return reject(new Error('Item not found.'))

    resolve(item);
  });
};

exports.deleteItem = function(category, id) {
  return new Promise((resolve, reject) => {
    if(!category) return Promise.reject(new Error(`Expecte category`));
    
    var cat = storage[category];
    if(!cat) return reject(new Error('Category not found'));
    if(!id) return reject(new Error('ID not found'));

    var item = cat[id]
    if(!item) return reject(new Error('Item not found.'))
    delete storage[category][id];

    resolve({});
  });
};