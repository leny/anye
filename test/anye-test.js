"use strict";

var Anye = require( "../lib/anye.js" );

module.exports = {
    setUp: function( fDone ) {
        Anye.clear();
        fDone();
    },

    "Anye Tests": function( oTest ) {
        // Setting
        oTest.equal( Anye.set( "simple", "/url/" ), "/url/", "Anye.set should return the given URL." );
        oTest.equal( Anye.set( "one-param", "/url/:id" ), "/url/:id", "Anye.set should return the given URL." );

        // Counting
        oTest.equal( Anye.length, 2, "Anye.length should be 2." );
        Anye.set( "multi-params", "/url/:id/:module" );
        oTest.equal( Anye.length, 3, "Anye.length should be 3." );

        // Clearing
        Anye.clear();
        oTest.equal( Anye.length, 0, "Anye.length should be 0." );

        Anye.set( "simple", "/url/" );
        Anye.set( "one-param", "/url/:id" );
        Anye.set( "multi-params", "/url/:id/:module" );

        // Retrieving
        oTest.throws( function() { Anye.get( "unknown" ); }, "Anye.get should throws when calling an url that is not in the store." );

        oTest.equal( Anye.get( "simple" ), "/url/", "Anye.get should return the good url." );

        oTest.throws( function() { Anye.get( "one-param" ); }, "Anye.get should throws when calling an url expecting with no params." );
        oTest.throws( function() { Anye.get( "one-param", { foo: "bar" } ); }, "Anye.get should throws when calling an url expecting with not the attended params." );
        oTest.equal( Anye.get( "one-param", { id: 2 } ), "/url/2", "Anye.get should return the good url, with the given params." );
        oTest.equal( Anye.get( "one-param", { id: "bar" } ), "/url/bar", "Anye.get should return the good url, with the given params." );

        oTest.throws( function() { Anye.get( "multi-params", { id: 2 } ); }, "Anye.get should throws when calling an url expecting with not the attended params." );
        oTest.equal( Anye.get( "multi-params", { id: 2, module: "foo" } ), "/url/2/foo", "Anye.get should return the good url, with the given params." );
        oTest.equal( Anye.get( "multi-params", { module: 2, id: "foo" } ), "/url/foo/2", "Anye.get should return the good url, with the given params." );

            // URL Encoding
        oTest.equal( Anye.get( "one-param", { id: "bar^" } ), "/url/bar^", "Anye.get should return the good url, with the given params." );
        oTest.equal( Anye.get( "one-param", { id: "bar^" }, true ), "/url/bar%5E", "Anye.get should return the good url, with the given params, and URL-encoded." );

        oTest.done();
    }
};
