# anyè

> Server-agnostic named URL builder for node.js

* * *

**note:** anyè is in early development. The doc is written as a *TODO*, the code will come in the week.

* * *

## Getting started

Install the module with: `npm install anye`

## Usage

Require module.

```javascript
var Anye = require( "anye" );
```

### Store/set an URL

```javascript
Anye.set( "name", "/url/:id" );
```

**Note:** the `set` method returns the stored URL, so you can use it directly in your route definition like in express: `app.post( Anye.set( "name", "/url/:id" ), routeHandler );` 

### Retrieve/get/build an URL

```javascript
Anye.get( "name", { id: 2 } ); // will returns "/url/2"
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](//gruntjs.com).

## Release History

**2014-10-05:** starting project.

## License

Copyright (c) 2014 Leny for KRKN  
Licensed under the MIT license.
