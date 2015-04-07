# auth0-api-tokens ![build status](https://travis-ci.org/auth0/auth0-api-tokens.svg?branch=master)

Library that given Auth0 global client credentials allows users to generate JWT tokens for API v2.

You can read more about API v2 tokens in [this blog post](https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/) and in the [API explorer](https://docs.auth0.com/apiv2).

## Installation
```
npm i auth0-api-tokens
```

## Usage
```js
var TOKEN_EXPIRATION_IN_SECONDS = 3600;

var createToken = require('auth0-api-tokens')({
    clientId: '{YOUR_GLOBAL_CLIENT_ID}',
    clientSecret: '{YOUR_GLOBAL_CLIENT_Secret}',
}, TOKEN_EXPIRATION_IN_SECONDS)

// each key is an entity, each array element is an action
var token = createToken({
    users: ['read', 'write'],
    clients: ['delete']
});

console.log(token); // 'ey...'
```

## Documentation

For more information about [auth0](http://auth0.com) contact our [documentation page](http://docs.auth0.com/).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author
[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
