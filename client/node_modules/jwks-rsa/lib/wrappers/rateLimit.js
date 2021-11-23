'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options,
      _ref$jwksRequestsPerM = _ref.jwksRequestsPerMinute,
      jwksRequestsPerMinute = _ref$jwksRequestsPerM === undefined ? 10 : _ref$jwksRequestsPerM;

  var logger = (0, _debug2.default)('jwks');
  var getSigningKey = client.getSigningKey;

  var limiter = new _limiter.RateLimiter(jwksRequestsPerMinute, 'minute', true);
  logger('Configured rate limiting to JWKS endpoint at ' + jwksRequestsPerMinute + '/minute');

  return function (kid, cb) {
    limiter.removeTokens(1, function (err, remaining) {
      if (err) {
        return cb(err);
      }

      logger('Requests to the JWKS endpoint available for the next minute:', remaining);
      if (remaining < 0) {
        logger('Too many requests to the JWKS endpoint');
        return cb(new _JwksRateLimitError2.default('Too many requests to the JWKS endpoint'));
      } else {
        return getSigningKey(kid, cb);
      }
    });
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _limiter = require('limiter');

var _JwksRateLimitError = require('../errors/JwksRateLimitError');

var _JwksRateLimitError2 = _interopRequireDefault(_JwksRateLimitError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }