import {
  OAuthConnectorBase
}
from '@hoist/oauth-connector';
import {
  merge
}
from 'lodash';

console.log(OAuthConnectorBase);

let overrides = {
  requestTokenUri: 'https://api.twitter.com/oauth/request_token',
  accessTokenUri: 'https://api.twitter.com/oauth/access_token',
  authorizationUri: 'https://api.twitter.com/oauth/authorize'
};

/**
 * A Hoist Connector for connecting to GitHub
 * @extends {OAuthConnectorBase}
 */
export default class TwitterConnector extends OAuthConnectorBase {

  /**
   * create a new connector
   * @param {object} configuration - the configuration properties to use
   * @param {string} configuration.consumerKey - the OAuth2 consumer key
   * @param {string} configuration.consumerSecret - the OAuth consumer secret
   */
  constructor(configuration) {
    super(merge({}, configuration, overrides));
    this._clientId = configuration.clientId;
  }

}
