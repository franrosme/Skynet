'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options,
      _ref$cacheMaxEntries = _ref.cacheMaxEntries,
      cacheMaxEntries = _ref$cacheMaxEntries === undefined ? 5 : _ref$cacheMaxEntries,
      _ref$cacheMaxAge = _ref.cacheMaxAge,
      cacheMaxAge = _ref$cacheMaxAge === undefined ? (0, _ms2.default)('10m') : _ref$cacheMaxAge;

  var logger = (0, _debug2.default)('jwks');
  var getSigningKey = client.getSigningKey;

  logger('Configured caching of signing keys. Max: ' + cacheMaxEntries + ' / Age: ' + cacheMaxAge);
  return (0, _lruMemoizer2.default)({
    load: function load(kid, callback) {
      getSigningKey(kid, function (err, key) {
        if (err) {
          return callback(err);
        }

        logger('Caching signing key for \'' + kid + '\':', key);
        return callback(null, key);
      });
    },
    hash: function hash(kid) {
      return kid;
    },
    maxAge: cacheMaxAge,
    max: cacheMaxEntries
  });
};

var _ms = require('ms');

var _ms2 = _interopRequireDefault(_ms);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lruMemoizer = require('lru-memoizer');

var _lruMemoizer2 = _interopRequireDefault(_lruMemoizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }