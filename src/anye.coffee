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

oDataStore = {}
rMatchURLParam = /:[a-z0-9_]+/gi

module.exports = oAnye =
    clear: ->
        oDataStore = {}

    set: ( sName, sURL ) ->
        oDataStore[ sName ] = sURL

    get: ( sName, oParams, bEncode ) ->
        throw new Error "Unknown URL '#{ sName }'!" unless sURL = oDataStore[ sName ]

        unless aMatches = sURL.match( rMatchURLParam ) ? []
            return sURL

        for sMatch in aMatches
            throw new Error "Undefined param '#{ sMatch }'!" unless mValue = oParams[ sMatch.slice 1 ]
            sURL = sURL.replace sMatch, mValue

        i = 0
        for sParam, mValue of oParams when ":#{ sParam }" not in aMatches
            sURL += ( if i++ is 0 then "?" else "&" ) + "#{ sParam }=#{ mValue }"

        if !!bEncode then encodeURI sURL else sURL

_countStoredURLs = ->
    Object.keys( oDataStore ).length

oAnye.__defineGetter__ "length", _countStoredURLs
