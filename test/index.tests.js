var expect = require('chai').expect;
var jws  = require('jws');

var createToken = require('..')({
  clientId: 'my_client',
  clientSecret: '3IbdgWA2kUk4MbIf1-17J5JjpcJDwOqFsVQ2TnrrzsVvwPTE84wNoEX8EdPpsn7F'
});

describe('token creation', function(){
  var token, decodedToken, header, payload;
  before(function(){
    token = createToken({
      scopes: {
        users: [ 'read', 'update' ],
        clients: [ 'delete' ]
      },
      lifetimeInSeconds: 3600,
      extra_claims: {
        foo: 'bar'
      }
    });

    decodedToken = jws.decode(token);
    header = decodedToken.header;
    payload = decodedToken.payload;
  });


  it('should set iat', function(){
    var maxIssuedAt = Math.floor(new Date().getTime() / 1000);
    expect(payload.iat).to.be.at.most(maxIssuedAt);
  });

  it('should have scopes based on parameters', function(){
    expect(Object.keys(payload.scopes)).to.have.length(2);
    var usersScopes = payload.scopes.users;
    var clientScopes = payload.scopes.clients;

    expect(usersScopes.actions).to.have.length(2);
    expect(usersScopes.actions[0]).to.equal('read');
    expect(usersScopes.actions[1]).to.equal('update');

    expect(clientScopes.actions).to.have.length(1);
    expect(clientScopes.actions[0]).to.have.equal('delete');
  });

  it('should set header', function(){
    expect(header.alg).to.equal('HS256');
    expect(header.typ).to.equal('JWT');
  });

  it('should expire in 3600 seconds', function(){
    expect(payload.iat + 3600).to.equal(payload.exp);
  });

  it('should set extra claims', function(){
    expect(payload.foo).to.equal('bar');
  });
});