"use strict";

module.exports = ( grunt ) => {

    require( "load-grunt-tasks" )( grunt );

    grunt.initConfig( {
        "eslint": {
            "src": [ "src/**/*.js" ]
        },
        "babel": {
            "options": {
                "presets": [ "es2015" ]
            },
            "src": {
                "files": [ {
                    "expand": true,
                    "cwd": "src/",
                    "src": [ "**/*.js" ],
                    "dest": "lib/"
                } ]
            }
        },
        "nodeunit": {
            "files": [ "test/**/*-test.js" ]
        },
        "watch": {
            "src": {
                "files": "src/**/*.js",
                "tasks": [ "default" ]
            }
        }
    } );

    grunt.registerTask( "test", [ "nodeunit" ] );

    grunt.registerTask( "default", [
        "eslint",
        "babel",
        "test"
    ] );

    grunt.registerTask( "work", [
        "default",
        "watch"
    ] );

};
