
/*
 * anyè
 * https://github.com/leny/anye
 *
 * JS/COFFEE Document - /anye.js - module entry point
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
 */
"use strict";
var oAnye, oDataStore, rMatchURLParam, _countStoredURLs,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

oDataStore = {};

rMatchURLParam = /:[a-z0-9_]+/gi;

module.exports = oAnye = {
  clear: function() {
    return oDataStore = {};
  },
  set: function(sName, sURL) {
    return oDataStore[sName] = sURL;
  },
  get: function(sName, oParams, bEncode) {
    var aMatches, i, mValue, sMatch, sParam, sURL, _i, _len, _ref, _ref1;
    if (!(sURL = oDataStore[sName])) {
      throw new Error("Unknown URL '" + sName + "'!");
    }
    if (!(aMatches = (_ref = sURL.match(rMatchURLParam)) != null ? _ref : [])) {
      return sURL;
    }
    for (_i = 0, _len = aMatches.length; _i < _len; _i++) {
      sMatch = aMatches[_i];
      if (!(mValue = oParams[sMatch.slice(1)])) {
        throw new Error("Undefined param '" + sMatch + "'!");
      }
      sURL = sURL.replace(sMatch, mValue);
    }
    i = 0;
    for (sParam in oParams) {
      mValue = oParams[sParam];
      if (_ref1 = ":" + sParam, __indexOf.call(aMatches, _ref1) < 0) {
        sURL += (i++ === 0 ? "?" : "&") + ("" + sParam + "=" + mValue);
      }
    }
    if (!!bEncode) {
      return encodeURI(sURL);
    } else {
      return sURL;
    }
  }
};

_countStoredURLs = function() {
  return Object.keys(oDataStore).length;
};

oAnye.__defineGetter__("length", _countStoredURLs);
