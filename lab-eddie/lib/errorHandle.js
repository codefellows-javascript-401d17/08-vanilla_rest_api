'use strict'

module.exports = function(paramNames, params) {
  let args = params.length;
  if (paramNames.length !== args) throw new Error(`Expected ${paramNames[args]}`);
}