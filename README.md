# anyè

[![NPM version](http://img.shields.io/npm/v/anye.svg)](https://www.npmjs.org/package/anye) [![Build Status](https://secure.travis-ci.org/leny/anye.png?branch=master)](http://travis-ci.org/leny/anye) ![Dependency Status](https://david-dm.org/leny/anye.svg) ![Downloads counter](http://img.shields.io/npm/dm/anye.svg)


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

##### Aliases

`Anye.store()`

#### Example

```javascript
Anye.set( "name", "/url/:id" ); // will returns "/url/:id"
```

### Retrieve/get/build an URL

#### Signature

```javascript
Anye.get( sName, oParams, bDecode )
```

##### Arguments

- `sName` is the key of the URL in the store.
- `oParams` is an hash of parameters for the URL, replacing the `:variable` in the stored URL. All the additonal parameters will be added to the query string of the URL. Array & Object are supported.
- `bDecode` is a flag to ensure the returned URL is URL-decoded. `false` by default.

**Note:** if a parameter of the URL is not given, **anyè** will throws.

**Update:** since version `0.3.0`, all the returned URLs are URL-encoded by default.

##### Aliases

`Anye.retrieve(), Anye.build()`

#### Example

```javascript
Anye.get( "name", { id: 2 } ); // will returns "/url/2"
Anye.get( "name", { id: "bar^" } ); // will returns "/url/bar%5E"
Anye.get( "name", { id: "bar^" }, true ); // will returns "/url/bar^"
Anye.get( "name", { id: 2, foo: "bar", bar: "baz" } ); // will returns "/url/2?foo=bar&bar=baz"
Anye.get( "name", { id: 2, foo: "bar", bar: { baz: "bar", zab: "baz" } } ); // will returns "/url/2?foo=bar&bar%5Bbaz%5D=bar&bar%5Bzab%5D=baz"
```

### Generate an URL

#### Signature

```javascript
Anye.generate( sURL, oParams, bDecode )
```

##### Arguments

- `sURL` is the URL to use. It can have named-parameters beginning by `:`, like in `/url/:id`.
- `oParams` is an hash of parameters for the URL, replacing the `:variable` in the stored URL. All the additonal parameters will be added to the query string of the URL. Array & Object are supported.
- `bDecode` is a flag to ensure the returned URL is URL-decoded. `false` by default.

**Note:** if a parameter of the URL is not given, **anyè** will throws.

#### Example

```javascript
Anye.generate( "/url/:id", { id: 2 } ); // will returns "/url/2"
Anye.generate( "/url/:id", { id: "bar^" } ); // will returns "/url/bar%5E"
Anye.generate( "/url/:id", { id: "bar^" }, true ); // will returns "/url/bar^"
Anye.generate( "/url/:id", { id: 2, foo: "bar", bar: "baz" } ); // will returns "/url/2?foo=bar&bar=baz"
Anye.generate( "/url/:id", { id: 2, foo: "bar", bar: { baz: "bar", zab: "baz" } } ); // will returns "/url/2?foo=bar&bar%5Bbaz%5D=bar&bar%5Bzab%5D=baz"
```

### Get the raw URL

#### Signature

```javascript
Anye.raw( sName )
```

##### Arguments

- `sName` is the key of the URL in the store.

**Note:** if a parameter of the URL is not given, **anyè** will throws.

**Update:** since version `0.3.0`, all the returned URLs are URL-encoded by default.

##### Aliases

`Anye.url()`

#### Example

```javascript
Anye.raw( "name"); // will returns "/url/:id"
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

### Get all the store

#### Signature

```javascript
Anye.all()
```

#### Example

```javascript
Anye.all(); // will returns { "name": "/url/:id" }
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](//gruntjs.com).

## Release History

* **2015-12-06:** version `0.6.1`, update minimal runtime version.
* **2015-12-06:** version `0.6.0`, add `all` method.
* **2015-09-11:** version `0.5.0`, add `raw` method.
* **2014-10-07:** version `0.4.0`, add aliases, add `generate` method.
* **2014-10-06:** version `0.3.0`, returned URLs are encoded by default.
* **2014-10-06:** version `0.2.0`, add query-string population with additional parameters.
* **2014-10-05:** version `0.1.0`, initial release.

## License

Copyright (c) 2014 leny  
Licensed under the MIT license.
