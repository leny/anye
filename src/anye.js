/* leny/anye
 *
 * /src/anye.js - Main entry point
 *
 * coded by leny@flatLand!
 * refactored at 01/04/2019
 */

import QS from "qs";

let oDataStore = {},
    rMatchURLParam = /:[a-z0-9_]+/gi,
    fClear,
    fSet,
    fRaw,
    fGet,
    fGenerate,
    fCount,
    fAll;

fClear = function() {
    oDataStore = {};
};

fSet = function(sName, sURL) {
    oDataStore[sName] = sURL;
    return oDataStore[sName];
};

fRaw = function(sName) {
    if (!oDataStore[sName]) {
        throw new Error(`Unknown URL '${sName}'!`);
    }
    return oDataStore[sName];
};

fGet = function(sName, oParams, bDecode) {
    let sURL;

    if (!(sURL = oDataStore[sName])) {
        throw new Error(`Unknown URL '${sName}'!`);
    }
    return fGenerate(sURL, oParams, bDecode);
};

fGenerate = function(sURL, oParams, bDecode) {
    let aMatches = sURL.match(rMatchURLParam) || [],
        oAdditionalParams = {},
        sQueryString,
        sAssembledURL = sURL;

    for (let sMatch of aMatches) {
        let mValue;

        if (!(mValue = oParams[sMatch.slice(1)])) {
            throw new Error(`Undefined param '${sMatch}'!`);
        }
        sAssembledURL = sAssembledURL.replace(
            sMatch,
            encodeURIComponent(mValue),
        );
    }

    for (let sParam in oParams) {
        if (aMatches.indexOf(`:${sParam}`) === -1) {
            oAdditionalParams[sParam] = oParams[sParam];
        }
    }

    if ((sQueryString = QS.stringify(oAdditionalParams))) {
        sAssembledURL += `?${sQueryString}`;
    }

    return bDecode ? decodeURIComponent(sAssembledURL) : sAssembledURL;
};

fCount = function() {
    return Object.keys(oDataStore).length;
};

fAll = function() {
    return oDataStore;
};

export {
    fClear as clear,
    fGenerate as generate,
    fSet as set,
    fSet as store,
    fGet as get,
    fGet as retrieve,
    fGet as build,
    fRaw as raw,
    fRaw as url,
    fAll as all,
    fCount as count,
};
