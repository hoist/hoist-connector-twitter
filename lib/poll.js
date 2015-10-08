'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _hoistLogger = require('@hoist/logger');

var _hoistLogger2 = _interopRequireDefault(_hoistLogger);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _hoistErrors = require('@hoist/errors');

var _hoistErrors2 = _interopRequireDefault(_hoistErrors);

var APILimitReachedError = _hoistErrors2['default'].create({
  name: 'APILimitReachedError'
});

var ConnectorRequiresAuthorizationError = _hoistErrors2['default'].create({
  name: 'ConnectorRequiresAuthorizationError'
});

var frequency = 90; //poll every 90 seconds

var TwitterPoller = (function () {
  function TwitterPoller(context) {
    _classCallCheck(this, TwitterPoller);

    this._logger = _hoistLogger2['default'].child({
      cls: this.constructor.name,
      subscription: context.subscription._id,
      application: context.application._id
    });
    this._context = context;
    this._connector = new _connector2['default'](context.settings);
  }

  _createClass(TwitterPoller, [{
    key: 'poll',
    value: function poll() {
      var _this = this;

      return this.assertCanPoll().then(function () {
        return _this._context.subscription.set('lastPolled', _moment2['default'].utc().format());
      }).then(function () {
        return _this.pollSubscription();
      })['catch'](function (err) {
        _this._logger.error(err);
        if (!(err instanceof APILimitReachedError) && !(err instanceof ConnectorRequiresAuthorizationError)) {
          _this._logger.alert(err);
        }
      });
    }
  }, {
    key: 'assertCanPoll',
    value: function assertCanPoll() {
      var _this2 = this;

      var lastPolled = this._context.subscription.get('lastPolled');
      return Promise.resolve().then(function () {
        _this2._logger.info({
          lastPolled: lastPolled
        }, 'checking if the poll can happen');
        if (lastPolled && new _moment2['default'](lastPolled).isAfter(new _moment2['default']().subtract(frequency, 'seconds'))) {
          _this2._logger.warn('Poller limit reached');
          _this2._context.subscription.delayTill(new _moment2['default'](lastPolled).add(frequency, 'seconds').toDate());
          throw new APILimitReachedError();
        }
      }).then(function () {
        _this2._logger.info('checking credentials');
        if (!_this2._context.authorization) {
          _this2._logger.warn('Connector needs auth and no auth set');
          if (!lastPolled) {
            lastPolled = new _moment2['default']().toDate();
          }
          _this2._context.subscription.delayTill(new _moment2['default'](lastPolled).add(frequency, 'seconds').toDate());
          throw new ConnectorRequiresAuthorizationError();
        }
      });
    }
  }, {
    key: 'pollSubscription',
    value: function pollSubscription() {
      var _this3 = this;

      return Promise.resolve().then(function () {
        _this3._logger.info('setting connector authorization');
        return _this3._connector.authorize(_this3._context.authorization);
      }).then(function () {
        _this3._logger.info('polling endpoints');
        return Promise.all(_this3._context.subscription.endpoints.map(function (endpoint) {
          return _this3.pollEndpoint(endpoint);
        }));
      }).then(function () {
        _this3._logger.info('subscription polled');
      });
    }
  }, {
    key: 'pollEndpoint',
    value: function pollEndpoint(endpoint) {
      if (endpoint.toLowerCase() === "mention") {
        return this.pollMentions();
      } else if (endpoint.toLowerCase() === "directmessage") {
        return this.pollDirectMessages();
      } else if (endpoint.toLowerCase() === "tweet") {
        return this.pollTweets();
      }
    }
  }, {
    key: 'pollMentions',
    value: function pollMentions() {
      var _this4 = this;

      return Promise.resolve().then(function () {
        var endpointMeta = _this4._context.subscription.get('mentions');
        if (!endpointMeta) {
          endpointMeta = {};
        }
        var path = "/statuses/mentions_timeline.json?contributor_details=true";
        if (endpointMeta.lastId) {
          path = path + "&since_id=" + endpointMeta.lastId;
        }
        return _this4._connector.get(path).then(function (mentions) {
          _this4._logger.info({
            mentions: mentions.length
          }, 'got mentions');
          if (mentions.length > 0) {
            var _ret = (function () {
              var latest = mentions[0];
              _this4._logger.info('processing mentions');
              return {
                v: Promise.all(mentions.map(function (mention) {

                  if (endpointMeta && (!endpointMeta.lastId || mention.id > endpointMeta.lastId)) {
                    if (mention.id > latest.id) {
                      _this4._logger.info({
                        id: mention.id
                      }, 'updating id');
                      latest = mention;
                    }
                    _this4._logger.info('processing mention');
                    return _this4.processMention(mention);
                  } else {
                    _this4._logger.info({
                      mention: mention
                    }, 'mention id was less than last id');
                  }
                })).then(function () {
                  endpointMeta.lastId = latest.id;
                  return _this4._context.subscription.set('mentions', endpointMeta);
                })
              };
            })();

            if (typeof _ret === 'object') return _ret.v;
          } else {
            _this4._logger.info('no mentions to process');
          }
        });
      });
    }
  }, {
    key: 'processMention',
    value: function processMention(mention) {
      this._logger.info({
        mention: mention.id
      }, 'raising event for new mention');
      var eventName = this._context.connectorKey + ':new:mention';
      return this.emit(eventName, mention);
    }
  }, {
    key: 'pollTweets',
    value: function pollTweets() {
      var _this5 = this;

      return Promise.resolve().then(function () {
        var endpointMeta = _this5._context.subscription.get('tweets');
        if (!endpointMeta) {
          endpointMeta = {};
        }
        var path = "/statuses/user_timeline.json?contributor_details=true";
        if (endpointMeta.lastId) {
          path = path + "&since_id=" + endpointMeta.lastId;
        }
        return _this5._connector.get(path).then(function (tweets) {
          _this5._logger.info({
            tweets: tweets.length
          }, 'got tweets');
          if (tweets.length > 0) {
            var _ret2 = (function () {
              var latest = tweets[0];
              _this5._logger.info('processing tweets');
              return {
                v: Promise.all(tweets.map(function (mention) {

                  if (endpointMeta && (!endpointMeta.lastId || mention.id > endpointMeta.lastId)) {
                    if (mention.id > latest.id) {
                      _this5._logger.info({
                        id: mention.id
                      }, 'updating id');
                      latest = mention;
                    }
                    _this5._logger.info('processing mention');
                    return _this5.processTweet(mention);
                  } else {
                    _this5._logger.info({
                      mention: mention
                    }, 'mention id was less than last id');
                  }
                })).then(function () {
                  endpointMeta.lastId = latest.id;
                  return _this5._context.subscription.set('tweets', endpointMeta);
                })
              };
            })();

            if (typeof _ret2 === 'object') return _ret2.v;
          } else {
            _this5._logger.info('no tweets to process');
          }
        });
      });
    }
  }, {
    key: 'processTweet',
    value: function processTweet(tweet) {
      this._logger.info({
        tweet: tweet.id
      }, 'raising event for new tweet');
      var eventName = this._context.connectorKey + ':new:tweet';
      return this.emit(eventName, tweet);
    }
  }]);

  return TwitterPoller;
})();

exports['default'] = function (context, raiseMethod) {
  var poller = new TwitterPoller(context);
  poller.emit = raiseMethod;
  return poller.poll();
};

;
module.exports = exports['default'];
//# sourceMappingURL=poll.js.map