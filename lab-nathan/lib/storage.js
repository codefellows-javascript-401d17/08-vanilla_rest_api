'use strict';

module.exports = Storage;

function Storage() {}

Storage.prototype.add = function(categoryName, item) {
  let category = this[categoryName];

  if (!category) {
    category = {};
  }

  category[item.id] = item;
};

Storage.prototype.get = function(categoryName, id) {
  let category = this[categoryName];

  if (category && category[id]) {
    return category[id];
  }

  throw new Error(`No note exists with an id ${id}`);
};