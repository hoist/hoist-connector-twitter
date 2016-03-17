'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _oauthConnector = require('@hoist/oauth-connector');

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var overrides = {
  requestTokenUri: 'https://api.twitter.com/oauth/request_token',
  accessTokenUri: 'https://api.twitter.com/oauth/access_token',
  authorizationUri: 'https://api.twitter.com/oauth/authorize'
};
var baseUri = 'https://api.twitter.com/1.1';
/**
 * A Hoist Connector for connecting to GitHub
 * @extends {OAuthConnectorBase}
 */

var TwitterConnector = function (_OAuthConnectorBase) {
  _inherits(TwitterConnector, _OAuthConnectorBase);

  /**
   * create a new connector
   * @param {object} configuration - the configuration properties to use
   * @param {string} configuration.consumerKey - the OAuth2 consumer key
   * @param {string} configuration.consumerSecret - the OAuth consumer secret
   */

  function TwitterConnector(configuration) {
    _classCallCheck(this, TwitterConnector);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TwitterConnector).call(this, (0, _lodash.merge)({}, configuration, overrides)));

    _this._clientId = configuration.clientId;
    return _this;
  }

  _createClass(TwitterConnector, [{
    key: 'get',
    value: function get(path) {

      this._logger.info({
        path: path
      }, 'performing a get request');
      return this._performRequest('GET', '' + baseUri + path).then(function (result) {
        return JSON.parse(result);
      });
    }
  }, {
    key: 'post',
    value: function post(path, body) {
      this._logger.info({
        path: path
      }, 'performing a post request');
      return this._performRequest('POST', '' + baseUri + path, body, 'application/json').then(function (result) {
        return JSON.parse(result);
      });
    }
  }]);

  return TwitterConnector;
}(_oauthConnector.OAuthConnectorBase);

exports.default = TwitterConnector;

module.exports = TwitterConnector;
//# sourceMappingURL=connector.js.map
