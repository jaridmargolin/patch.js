/*!
 * patch.js
 * 
 * Copyright (c) 2014
 */




/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var _ = require('underscore');


/* -----------------------------------------------------------------------------
 * patch
 * ---------------------------------------------------------------------------*/

module.exports = {

  store: {},

  /**
   *
   */
  add: function (obj, methodName, patch) {
    if (!_.isArray(obj)) {
      return this.patchObj(obj, methodName, patch);
    }

    _.each(obj, function (obj) {
      return this.patchObj(obj, methodName, patch);
    }, this);
  },

  /**
   *
   */
  patchObj: function (obj, methodName, patch) {
    if (!_.isArray(patch)) {
      return this.addPatch(obj, methodName, patch);
    }

    _.each(patch, function (patch) {
      return this.addPatch(obj, methodName, patch);
    }, this);
  },

  /**
   *
   */
  addPatch: function (obj, methodName, patch) {
    var original = obj[methodName];
    var patched  = patch(original);

    obj[methodName] = patched;

    this.store[methodName] = this.store[methodName] || [];
    this.store[methodName].push({ obj: obj, original: original });
  },

  /**
   *
   */
  remove: function (obj, methodName) {
    // Nothing to remove. Fails silently. We maybe could be louder here?
    var store = this.store[methodName];
    if (!store) {
      return store;
    }

    if (!_.isArray(obj)) {
      return this.removePatch(obj, methodName, store);
    }

    _.each(obj, function (obj) {
      return this.removePatch(obj, methodName, store);
    }, this);
  },

  /**
   *
   */
  removePatch: function (obj, methodName, store) {
    // use for loop so that we can exit early if an item is found
    // loop backwards in order to properly replay original methods
    for (var i = store.length - 1, l = 0; i > l; i--) {
      if (store[i].obj = obj) {
        obj[methodName] = store[i].original;
        store.splice(i, 1);
        return;
      }
    }
  }

};


