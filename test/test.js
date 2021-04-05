var vows = require('vows');
var assert = require('assert');
var strformat = require('../strformat.js');

vows.describe('strformat').addBatch({
  "When I perform strformat on a text without placeholder": {
    topic: function() {
      return strformat('hello world', false, {'dummy': 'stuff'});
    },
    "Then the result should be the same input": function(res) {
      assert.strictEqual(res, 'hello world');
    }
  },
  "When I perform strformat on a text with a placeholder": {
    topic: function() {
      return strformat('hello {what}', false, {'what': 'world'});
    },
    "Then the result should be the original text with the replaced texts": function(res) {
      assert.strictEqual(res, 'hello world');
    }
  },
  "When I perform strformat on a text with a escaped placeholder": {
    topic: function() {
      return strformat('hello {{what}}', false, {'what': 'world'});
    },
    "Then the result should be the original text without the escape sequence": function(res) {
      assert.strictEqual(res, 'hello {what}');
    }
  },
  "When I perform strformat on a text with no arguments": {
    topic: function() {
      return strformat('hello {what}');
    },
    "Then the result should be the same input": function(res) {
      assert.strictEqual(res, 'hello {what}');
    }
  },
  "When I perform strformat on a text and the arguments are an array": {
    topic: function() {
      return strformat('hello {1}', false, ['foo', 'world']);
    },
    "Then the result should be the original text with the replaced indexes in the array": function(res) {
      assert.strictEqual(res, 'hello world');
    }
  },
  "When I perform strformat on a text with a placeholder with @answer postfix": {
    topic: function() {
      return strformat('hello {what@answer} {up@answer}', false, {'what': 'world', 'up@answer': 'up', 'up': 'no'});
    },
    "Then the result should be the original text with the replaced texts": function(res) {
      assert.strictEqual(res, 'hello world up');
    }
  },
}).run();
