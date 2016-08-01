var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var DEFAULT_LIFETIME_IN_SECONDS = 36000;

module.exports = function(credentials){
  return function(params){
    var lifetimeInSeconds = params.lifetimeInSeconds || DEFAULT_LIFETIME_IN_SECONDS;
    var scopes = params.scopes || {};

    var payload = params.extra_claims || {};
    payload.iat = Math.floor(Date.now() / 1000);
    payload.scopes = Object.keys(scopes).reduce(function(c,v){
      c[v] = {
        actions: scopes[v]
      };

      return c;
    }, {});

    payload.jti = crypto
      .createHash('md5')
      .update(JSON.stringify(payload))
      .digest('hex');

    return jwt.sign(payload,
      new Buffer(credentials.clientSecret, 'base64'), {
        expiresInSeconds: lifetimeInSeconds,
        audience: credentials.clientId,
        noTimestamp: true // we generate it before for the `jti`
      });
  };
};