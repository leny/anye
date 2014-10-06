
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
var QS, oAnye, oDataStore, rMatchURLParam, _clear, _count, _generate, _get, _set,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QS = require("qs");

oDataStore = {};

rMatchURLParam = /:[a-z0-9_]+/gi;

_clear = function() {
  return oDataStore = {};
};

_set = function(sName, sURL) {
  return oDataStore[sName] = sURL;
};

_get = function(sName, oParams, bDecode) {
  var sURL;
  if (!(sURL = oDataStore[sName])) {
    throw new Error("Unknown URL '" + sName + "'!");
  }
  return _generate(sURL, oParams, bDecode);
};

_generate = function(sURL, oParams, bDecode) {
  var aMatches, mValue, oAdditionalParams, sMatch, sParam, sQueryString, _i, _len, _ref, _ref1;
  if (!(aMatches = (_ref = sURL.match(rMatchURLParam)) != null ? _ref : [])) {
    return sURL;
  }
  for (_i = 0, _len = aMatches.length; _i < _len; _i++) {
    sMatch = aMatches[_i];
    if (!(mValue = oParams[sMatch.slice(1)])) {
      throw new Error("Undefined param '" + sMatch + "'!");
    }
    sURL = sURL.replace(sMatch, encodeURIComponent(mValue));
  }
  oAdditionalParams = {};
  for (sParam in oParams) {
    mValue = oParams[sParam];
    if (_ref1 = ":" + sParam, __indexOf.call(aMatches, _ref1) < 0) {
      oAdditionalParams[sParam] = mValue;
    }
  }
  if (sQueryString = QS.stringify(oAdditionalParams)) {
    sURL += "?" + sQueryString;
  }
  if (!!bDecode) {
    return decodeURIComponent(sURL);
  } else {
    return sURL;
  }
};

_count = function() {
  return Object.keys(oDataStore).length;
};

module.exports = oAnye = {
  clear: _clear,
  generate: _generate,
  set: _set,
  store: _set,
  get: _get,
  retrieve: _get,
  build: _get
};

oAnye.__defineGetter__("length", _count);
