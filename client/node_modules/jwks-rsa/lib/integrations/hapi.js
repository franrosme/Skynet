'use strict';

var _errors = require('../errors');

var _JwksClient = require('../JwksClient');

var handleSigningKeyError = function handleSigningKeyError(err, cb) {
  // If we didn't find a match, can't provide a key.
  if (err && err.name === 'SigningKeyNotFoundError') {
    return cb(err, null, null);
  }

  // If an error occured like rate limiting or HTTP issue, we'll bubble up the error.
  if (err) {
    return cb(err, null, null);
  }
};

/**
 * Call hapiJwt2Key as a Promise
 * @param {object} options 
 * @returns {Promise}
 */
module.exports.hapiJwt2KeyAsync = function (options) {
  var secretProvider = module.exports.hapiJwt2Key(options);
  return function (decoded) {
    return new Promise(function (resolve, reject) {
      var cb = function cb(err, key) {
        !key || err ? reject(err) : resolve({ key: key });
      };
      secretProvider(decoded, cb);
    });
  };
};

module.exports.hapiJwt2Key = function (options) {
  if (options === null || options === undefined) {
    throw new _errors.ArgumentError('An options object must be provided when initializing hapiJwt2Key');
  }

  var client = new _JwksClient.JwksClient(options);
  var onError = options.handleSigningKeyError || handleSigningKeyError;

  return function secretProvider(decoded, cb) {
    // We cannot find a signing certificate if there is no header (no kid).
    if (!decoded || !decoded.header) {
      return cb(new Error('Cannot find a signing certificate if there is no header'), null, null);
    }

    // Only RS256 is supported.
    if (decoded.header.alg !== 'RS256') {
      return cb(new Error('Unsupported algorithm ' + decoded.header.alg + ' supplied. node-jwks-rsa supports only RS256'), null, null);
    }

    client.getSigningKey(decoded.header.kid, function (err, key) {
      if (err) {
        return onError(err, function (newError) {
          return cb(newError, null, null);
        });
      }

      // Provide the key.
      return cb(null, key.publicKey || key.rsaPublicKey, key);
    });
  };
};