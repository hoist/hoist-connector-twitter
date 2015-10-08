import {
  OAuthConnectorBase
}
from '@hoist/oauth-connector';
import {
  merge
}
from 'lodash';

let overrides = {
  requestTokenUri: 'https://api.twitter.com/oauth/request_token',
  accessTokenUri: 'https://api.twitter.com/oauth/access_token',
  authorizationUri: 'https://api.twitter.com/oauth/authorize'
};
let baseUri = 'https://api.twitter.com/1.1';
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
  get(path) {

    this._logger.info({
      path
    }, 'performing a get request');
    return this._performRequest('GET', `${baseUri}${path}`).then((result) => {
      return JSON.parse(result[0]);
    });
  }
  post(path, body) {
    this._logger.info({
      path
    }, 'performing a post request');
    return this._performRequest('POST', `${baseUri}${path}`, body, 'application/json').then((result) => {
      return JSON.parse(result[0]);
    });
  }
}
