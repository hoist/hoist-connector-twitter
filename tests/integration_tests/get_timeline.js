import config from 'config';
import TwitterConnector from '../../lib/connector';
import {
  expect
}
from 'chai';
describe('integration', () => {
  let connector;

  before(() => {
    let authorization = {
      get: (key) => {
        return config.get(key)
      }
    }
    connector = new TwitterConnector({
      consumerKey: config.get('consumerKey'),
      consumerSecret: config.get('consumerSecret')
    });
    connector.authorize(authorization);
  })
  describe('can recieve mentions timeline', () => {
    let result;
    before(() => {
      return connector.get('/statuses/mentions_timeline.json').then((r) => {
        result = r;
      });
    });
    it('returns a result', () => {
      return expect(result.length).to.be.greaterThan(0);
    })
  });
});
