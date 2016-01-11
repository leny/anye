"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.count = exports.all = exports.url = exports.raw = exports.build = exports.retrieve = exports.get = exports.store = exports.set = exports.generate = exports.clear = undefined;

var _qs = require("qs");

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oDataStore = {},
    rMatchURLParam = /:[a-z0-9_]+/gi,
    fClear = undefined,
    fSet = undefined,
    fRaw = undefined,
    fGet = undefined,
    fGenerate = undefined,
    fCount = undefined,
    fAll = undefined; /*
                       * anyè
                       * https://github.com/leny/anye
                       *
                       * JS Document - /anye.js - module entry point
                       *
                       * Copyright (c) 2014 Leny
                       * Licensed under the MIT license.
                       */

exports.clear = fClear = function fClear() {
    oDataStore = {};
};

exports.store = exports.set = fSet = function fSet(sName, sURL) {
    oDataStore[sName] = sURL;
    return oDataStore[sName];
};

exports.url = exports.raw = fRaw = function fRaw(sName) {
    if (!oDataStore[sName]) {
        throw new Error("Unknown URL '" + sName + "'!");
    }
    return oDataStore[sName];
};

exports.build = exports.retrieve = exports.get = fGet = function fGet(sName, oParams, bDecode) {
    var sURL = undefined;

    if (!(sURL = oDataStore[sName])) {
        throw new Error("Unknown URL '" + sName + "'!");
    }
    return fGenerate(sURL, oParams, bDecode);
};

exports.generate = fGenerate = function fGenerate(sURL, oParams, bDecode) {
    var aMatches = sURL.match(rMatchURLParam) || [],
        oAdditionalParams = {},
        sQueryString = undefined,
        sAssembledURL = sURL;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = aMatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var sMatch = _step.value;

            var mValue = undefined;

            if (!(mValue = oParams[sMatch.slice(1)])) {
                throw new Error("Undefined param '" + sMatch + "'!");
            }
            sAssembledURL = sAssembledURL.replace(sMatch, encodeURIComponent(mValue));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    for (var sParam in oParams) {
        if (aMatches.indexOf(":" + sParam) === -1) {
            oAdditionalParams[sParam] = oParams[sParam];
        }
    }

    if (sQueryString = _qs2.default.stringify(oAdditionalParams)) {
        sAssembledURL += "?" + sQueryString;
    }

    return bDecode ? decodeURIComponent(sAssembledURL) : sAssembledURL;
};

exports.count = fCount = function fCount() {
    return Object.keys(oDataStore).length;
};

exports.all = fAll = function fAll() {
    return oDataStore;
};

exports.clear = fClear;
exports.generate = fGenerate;
exports.set = fSet;
exports.store = fSet;
exports.get = fGet;
exports.retrieve = fGet;
exports.build = fGet;
exports.raw = fRaw;
exports.url = fRaw;
exports.all = fAll;
exports.count = fCount;
