var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var DEFAULT_LIFETIME_IN_SECONDS = 36000;

module.exports = function(credentials){
  return function(scopes, lifetimeInSeconds){
    lifetimeInSeconds = lifetimeInSeconds || DEFAULT_LIFETIME_IN_SECONDS;
    var payload = {
      iat: Math.floor(Date.now() / 1000),
      scopes: Object.keys(scopes).reduce(function(c,v){
        c[v] = {
          actions: scopes[v]
        };

        return c;
      }, {})
    };

    payload.jti = crypto
      .createHash('md5')
      .update(JSON.stringify(payload))
      .digest('hex');

    return jwt.sign(payload,
      new Buffer(credentials.clientSecret, 'base64').toString('binary'), {
        expiresInSeconds: lifetimeInSeconds,
        audience: credentials.clientId,
        noTimestamp: true // we generate it before for the `jti`
      });
  };
};