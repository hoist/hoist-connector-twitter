'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _hoistOauthConnector = require('@hoist/oauth-connector');

var _lodash = require('lodash');

console.log(_hoistOauthConnector.OAuthConnectorBase);

var overrides = {
  requestTokenUri: 'https://api.twitter.com/oauth/request_token',
  accessTokenUri: 'https://api.twitter.com/oauth/access_token',
  authorizationUri: 'https://api.twitter.com/oauth/authorize'
};

/**
 * A Hoist Connector for connecting to GitHub
 * @extends {OAuthConnectorBase}
 */

var TwitterConnector = (function (_OAuthConnectorBase) {
  _inherits(TwitterConnector, _OAuthConnectorBase);

  /**
   * create a new connector
   * @param {object} configuration - the configuration properties to use
   * @param {string} configuration.consumerKey - the OAuth2 consumer key
   * @param {string} configuration.consumerSecret - the OAuth consumer secret
   */

  function TwitterConnector(configuration) {
    _classCallCheck(this, TwitterConnector);

    _get(Object.getPrototypeOf(TwitterConnector.prototype), 'constructor', this).call(this, (0, _lodash.merge)({}, configuration, overrides));
    this._clientId = configuration.clientId;
  }

  return TwitterConnector;
})(_hoistOauthConnector.OAuthConnectorBase);

exports['default'] = TwitterConnector;
module.exports = exports['default'];
//# sourceMappingURL=connector.js.map