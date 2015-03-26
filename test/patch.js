/*!
 * test/patch.js
 * 
 * Copyright (c) 2014
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var patch  = require('patch');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('patch.js', function () {

  beforeEach(function () {
    this.o1 = {
      m1: function (val) { return val || 0; }
    };

    this.o2 = {
      m1: function (val) { return val || 0; }
    };

    this.p1 = function (original) {
      return function (val) { return original(val || 1); };
    };

    this.p2 = function (original) {
      return function (val) { return original(val || 2); };
    };
  });

  it('Should expose an add method.', function () {
    assert.isFunction(patch.add);
  });

  it('Should expose a remove method.', function () {
    assert.isFunction(patch.remove);
  });

  it('Should add the patch to the object.', function () {
    patch.add(this.o1, 'm1', this.p1);
    assert.equal(this.o1.m1(), 1);
  });

  it('Should remove the patch from the object.', function () {
    patch.remove(this.o1, 'm1');
    assert.equal(this.o1.m1(), 0);
  });

  it('Should accept an array of objects.', function () {
    patch.add([this.o1, this.o2], 'm1', this.p1);
    assert.equal(this.o1.m1(), 1);
    assert.equal(this.o2.m1(), 1);
  });

  it('Should accept an array of patches.', function () {
    patch.add(this.o1, 'm1', [this.p1, this.p2]);
    assert.equal(this.o1.m1(), 2);
  });

});


});