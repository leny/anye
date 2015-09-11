###
 * anyè
 * https://github.com/leny/anye
 *
 * JS/COFFEE Document - /anye.js - module entry point
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
###

"use strict"

QS = require "qs"

oDataStore = {}
rMatchURLParam = /:[a-z0-9_]+/gi

_clear = ->
    oDataStore = {}

_set = ( sName, sURL ) ->
    oDataStore[ sName ] = sURL

_raw = ( sName) ->
    oDataStore[ sName ] ? throw new Error "Unknown URL '#{ sName }'!"

_get = ( sName, oParams, bDecode ) ->
    throw new Error "Unknown URL '#{ sName }'!" unless sURL = oDataStore[ sName ]
    _generate sURL, oParams, bDecode

_generate = ( sURL, oParams, bDecode ) ->
    return sURL unless aMatches = sURL.match( rMatchURLParam ) ? []

    for sMatch in aMatches
        throw new Error "Undefined param '#{ sMatch }'!" unless mValue = oParams[ sMatch.slice 1 ]
        sURL = sURL.replace sMatch, encodeURIComponent mValue

    oAdditionalParams = {}
    oAdditionalParams[ sParam ] = mValue for sParam, mValue of oParams when ":#{ sParam }" not in aMatches

    sURL += "?#{ sQueryString }" if sQueryString = QS.stringify oAdditionalParams

    if !!bDecode then decodeURIComponent sURL else sURL

_count = ->
    Object.keys( oDataStore ).length

module.exports = oAnye =
    clear: _clear
    generate: _generate
    set: _set
    store: _set
    get: _get
    retrieve: _get
    build: _get
    raw:_raw
    url:_raw

oAnye.__defineGetter__ "length", _count
