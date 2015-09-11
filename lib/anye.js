
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
var QS, _clear, _count, _generate, _get, _raw, _set, oAnye, oDataStore, rMatchURLParam,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QS = require("qs");

oDataStore = {};

rMatchURLParam = /:[a-z0-9_]+/gi;

_clear = function() {
  return oDataStore = {};
};

_set = function(sName, sURL) {
  return oDataStore[sName] = sURL;
};

_raw = function(sName) {
  var sURL;
  if (!(sURL = oDataStore[sName])) {
    throw new Error("Unknown URL '" + sName + "'!");
  }
  return oDataStore[sName];
};

_get = function(sName, oParams, bDecode) {
  var sURL;
  if (!(sURL = oDataStore[sName])) {
    throw new Error("Unknown URL '" + sName + "'!");
  }
  return _generate(sURL, oParams, bDecode);
};

_generate = function(sURL, oParams, bDecode) {
  var aMatches, i, len, mValue, oAdditionalParams, ref, ref1, sMatch, sParam, sQueryString;
  if (!(aMatches = (ref = sURL.match(rMatchURLParam)) != null ? ref : [])) {
    return sURL;
  }
  for (i = 0, len = aMatches.length; i < len; i++) {
    sMatch = aMatches[i];
    if (!(mValue = oParams[sMatch.slice(1)])) {
      throw new Error("Undefined param '" + sMatch + "'!");
    }
    sURL = sURL.replace(sMatch, encodeURIComponent(mValue));
  }
  oAdditionalParams = {};
  for (sParam in oParams) {
    mValue = oParams[sParam];
    if (ref1 = ":" + sParam, indexOf.call(aMatches, ref1) < 0) {
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
  build: _get,
  raw: _raw,
  url: _raw
};

oAnye.__defineGetter__("length", _count);
