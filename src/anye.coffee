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

module.exports = oAnye =
    clear: ->
        oDataStore = {}

    set: ( sName, sURL ) ->
        oDataStore[ sName ] = sURL

    get: ( sName, oParams, bDecode ) ->
        throw new Error "Unknown URL '#{ sName }'!" unless sURL = oDataStore[ sName ]

        return sURL unless aMatches = sURL.match( rMatchURLParam ) ? []

        for sMatch in aMatches
            throw new Error "Undefined param '#{ sMatch }'!" unless mValue = oParams[ sMatch.slice 1 ]
            sURL = sURL.replace sMatch, encodeURIComponent mValue

        oAdditionalParams = {}
        oAdditionalParams[ sParam ] = mValue for sParam, mValue of oParams when ":#{ sParam }" not in aMatches

        sURL += "?#{ sQueryString }" if sQueryString = QS.stringify oAdditionalParams

        if !!bDecode then decodeURIComponent sURL else sURL

_countStoredURLs = ->
    Object.keys( oDataStore ).length

oAnye.__defineGetter__ "length", _countStoredURLs
