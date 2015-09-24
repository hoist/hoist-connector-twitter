'use strict';
import TwitterConnector from '../../lib/connector';
import {
  functions
}
from 'lodash';
import {
  expect
}
from 'chai';

function TestES5() {

}
TestES5.prototype.get = function () {

}

describe('Connector', () => {
  let _connector;
  before(() => {
    _connector = new TwitterConnector({});
  })
  describe('functions', () => {
    it('should have methods expected', () => {
      console.log(_connector.get);
      console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(new TestES5())));
      console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(_connector)));
    })
  });
});
