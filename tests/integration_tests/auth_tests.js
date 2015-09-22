import TwitterConnector from '../../lib/connector';
import sinon from 'sinon';
import {
  expect
}
from 'chai';
import config from 'config';

describe('authorization steps', () => {
  let connector;
  let consumerKey = config.get('consumerKey');
  let consumerSecret = config.get('consumerSecret');
  before(() => {
    connector = new TwitterConnector({
      consumerKey,
      consumerSecret
    });
  });
  describe('on first bounce', () => {
    let bounce;
    before(() => {
      bounce = {
        get: function () {
          return undefined;
        },
        delete: function () {
          return Promise.resolve(null);
        },
        set: function () {
          console.log('set', arguments);
          return Promise.resolve(null);
        },
        redirect: function () {
          console.log('redirect', arguments);
          return Promise.resolve(null);
        },
        done: function () {
          console.log('done', arguments);
          return Promise.resolve(null);
        }
      };
      sinon.spy(bounce, 'get');
      sinon.spy(bounce, 'set');
      sinon.spy(bounce, 'redirect');
      return connector.receiveBounce(bounce);
    });
    it('should save request token', () => {
      return expect(bounce.set).to.have.been.calledWith('RequestToken');
    });
    it('should save request token secret', () => {
      return expect(bounce.set).to.have.been.calledWith('RequestTokenSecret');
    });
    it('should save current step', () => {
      return expect(bounce.set).to.have.been.calledWith('currentStep', 'RequestToken');
    });
    it('should receive a redirect', () => {
      return expect(bounce.redirect).to.have.been.calledWith(`https://api.twitter.com/oauth/authorize?oauth_token=${bounce.set.getCall(0).args[1]}`);
    });
  });
});
