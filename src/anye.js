/* leny/anye
 *
 * /src/anye.js - Main entry point
 *
 * coded by leny@flatLand!
 * refactored at 01/04/2019
 */

import QS from "qs";

let datastore = {};

const matchURLParam = /:[a-z0-9_]+/gi;

const clear = () => {
    datastore = {};
};

const set = (name, url) => {
    datastore[name] = url;
    return datastore[name];
};

const raw = name => {
    if (!datastore[name]) {
        throw new Error(`Unknown URL '${name}'!`);
    }
    return datastore[name];
};

const generate = (url, params = {}, decode = false) => {
    let matches = url.match(matchURLParam) || [],
        additionalParams = {},
        queryString,
        result;

    result = matches.reduce((acc, match) => {
        let value;

        if (!(value = params[match.slice(1)])) {
            throw new Error(`Undefined param '${match}'!`);
        }

        return acc.replace(match, encodeURIComponent(value));
    }, url);

    Object.keys(params).forEach(param => {
        if (!matches.includes(`:${param}`)) {
            additionalParams[param] = params[param];
        }
    });

    if ((queryString = QS.stringify(additionalParams))) {
        result += `?${queryString}`;
    }

    return decode ? decodeURIComponent(result) : result;
};

const get = (name, params={}, decode = false) => {
    let url;

    if (!(url = datastore[name])) {
        throw new Error(`Unknown URL '${name}'!`);
    }
    return generate(url, params, decode);
};

const count = () => Object.keys(datastore).length;

const all = () => datastore;

export {
    clear,
    generate,
    set,
    set as store,
    get,
    get as retrieve,
    get as build,
    raw,
    raw as url,
    all,
    count,
};
