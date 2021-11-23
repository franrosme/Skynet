'use strict';

var _errors = require('../errors');

var _JwksClient = require('../JwksClient');

var handleSigningKeyError = function handleSigningKeyError(err, cb) {
  // If we didn't find a match, can't provide a key.
  if (err && err.name === 'SigningKeyNotFoundError') {
    return cb(null);
  }

  // If an error occured like rate limiting or HTTP issue, we'll bubble up the error.
  if (err) {
    return cb(err);
  }
};

module.exports.expressJwtSecret = function (options) {
  if (options === null || options === undefined) {
    throw new _errors.ArgumentError('An options object must be provided when initializing expressJwtSecret');
  }

  var client = new _JwksClient.JwksClient(options);
  var onError = options.handleSigningKeyError || handleSigningKeyError;

  return function secretProvider(req, header, payload, cb) {
    // Only RS256 is supported.
    if (!header || header.alg !== 'RS256') {
      return cb(null, null);
    }

    client.getSigningKey(header.kid, function (err, key) {
      if (err) {
        return onError(err, function (newError) {
          return cb(newError, null);
        });
      }

      // Provide the key.
      return cb(null, key.publicKey || key.rsaPublicKey);
    });
  };
};