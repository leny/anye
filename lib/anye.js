
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
var oAnye, oDataStore, rMatchURLParam, _countStoredURLs;

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
    var aMatches, mValue, sMatch, sURL, _i, _len;
    if (!(sURL = oDataStore[sName])) {
      throw new Error("Unknown URL '" + sName + "'!");
    }
    if (!(aMatches = sURL.match(rMatchURLParam))) {
      return sURL;
    }
    for (_i = 0, _len = aMatches.length; _i < _len; _i++) {
      sMatch = aMatches[_i];
      if (!(mValue = oParams[sMatch.slice(1)])) {
        throw new Error("Undefined param '" + sMatch + "'!");
      }
      sURL = sURL.replace(sMatch, mValue);
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
