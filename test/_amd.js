/*!
 * test/_amd.js
 * 
 * Copyright (c) 2014
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var patch  = require('patch/patch');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('amd - patch.js', function () {

  it('Should expose an add method.', function () {
    assert.isFunction(patch.add);
  });

  it('Should expose a remove method.', function () {
    assert.isFunction(patch.remove);
  });

});


});