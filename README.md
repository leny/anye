# anyè

[![NPM version](http://img.shields.io/npm/v/anye.svg)](https://www.npmjs.org/package/anye) [![Build Status](https://secure.travis-ci.org/krkn/anye.png?branch=master)](http://travis-ci.org/krkn/anye) ![Dependency Status](https://david-dm.org/krkn/anye.svg) ![Downloads counter](http://img.shields.io/npm/dm/anye.svg)


> Server-agnostic named URL builder for node.js

* * *


## Getting started

Install the module with: `npm install anye`

## Usage

Require module.

```javascript
var Anye = require( "anye" );
```

### Store/set an URL

#### Signature

```javascript
Anye.set( sName, sURL );
```

##### Arguments

- `sName` is the key to store the URL
- `sURL` is the URL to store. It can have named-parameters beginning by `:`, like in `/url/:id`.

**Note:** the `set` method returns the stored URL, so you can use it directly in your route definition like in express: `app.post( Anye.set( "name", "/url/:id" ), routeHandler );` 

#### Example

```javascript
Anye.set( "name", "/url/:id" ); // will returns "/url/:id"
```

### Retrieve/get/build an URL

#### Signature

```javascript
Anye.get( sName, oParams, bEncode )
```

##### Arguments

- `sName` is the key of the URL in the store.
- `oParams` is an hash of parameters for the URL, replacing the `:variable` in the stored URL. All the additonal parameters will be added to the query string of the URL.
- `bEncode` is a flag to ensure the returned URL is URL-encoded. `false` by default.

**Note:** if a parameter of the URL is not given, **anyè** will throws.

#### Example

```javascript
Anye.get( "name", { id: 2 } ); // will returns "/url/2"
Anye.get( "name", { id: "bar^" }, true ); // will returns "/url/bar%5E"
Anye.get( "name", { id: 2, foo: "bar", bar: "baz" } ); // will returns "/url/2?foo=bar&bar=baz"
```

### Clear the store

#### Signature

```javascript
Anye.clear()
```

#### Example

```javascript
Anye.get( "name", { id: 2 } ); // will returns "/url/2"
Anye.clear();
Anye.get( "name", { id: 2 } ); // throws Error
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](//gruntjs.com).

## Release History

**2014-10-05:** version `0.1.0`, initial release.

## License

Copyright (c) 2014 Leny for KRKN  
Licensed under the MIT license.
