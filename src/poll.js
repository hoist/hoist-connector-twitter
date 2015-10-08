import TwitterConnector from './connector';
import logger from '@hoist/logger';
import Moment from 'moment'
import errors from '@hoist/errors';


var APILimitReachedError = errors.create({
  name: 'APILimitReachedError'
});

var ConnectorRequiresAuthorizationError = errors.create({
  name: 'ConnectorRequiresAuthorizationError'
});

let frequency = 90; //poll every 90 seconds

class TwitterPoller {
  constructor(context) {
    this._logger = logger.child({
      cls: this.constructor.name,
      subscription: context.subscription._id,
      application: context.application._id
    });
    this._context = context;
    this._connector = new TwitterConnector(context.settings);
  }
  poll() {
    return this.assertCanPoll()
      .then(() => {
        return this._context.subscription.set('lastPolled', Moment.utc().format());
      })
      .then(() => {
        return this.pollSubscription()
      }).catch((err) => {
        this._logger.error(err);
        if (!(err instanceof APILimitReachedError) && !(err instanceof ConnectorRequiresAuthorizationError)) {
          this._logger.alert(err);
        }
      });
  }
  assertCanPoll() {
    var lastPolled = this._context.subscription.get('lastPolled');
    return Promise.resolve()
      .then(() => {
        this._logger.info({
          lastPolled: lastPolled
        }, 'checking if the poll can happen');
        if (lastPolled && new Moment(lastPolled).isAfter(new Moment().subtract(frequency, 'seconds'))) {
          this._logger.warn('Poller limit reached');
          this._context.subscription.delayTill(new Moment(lastPolled).add(frequency, 'seconds').toDate());
          throw new APILimitReachedError();
        }
      }).then(() => {
        this._logger.info('checking credentials');
        if (!(this._context.authorization)) {
          this._logger.warn('Connector needs auth and no auth set');
          if (!lastPolled) {
            lastPolled = new Moment().toDate();
          }
          this._context.subscription.delayTill(new Moment(lastPolled).add(frequency, 'seconds').toDate());
          throw new ConnectorRequiresAuthorizationError();
        }
      });
  }
  pollSubscription() {
    return Promise.resolve()
      .then(() => {
        this._logger.info('setting connector authorization');
        return this._connector.authorize(this._context.authorization);
      }).then(() => {
        this._logger.info('polling endpoints');
        return Promise.all(this._context.subscription.endpoints.map((endpoint) => {
          return this.pollEndpoint(endpoint);
        }));
      }).then(() => {
        this._logger.info('subscription polled');
      });
  }
  pollEndpoint(endpoint) {
    if (endpoint.toLowerCase() === "mention") {
      return this.pollMentions();
    } else if (endpoint.toLowerCase() === "directmessage") {
      return this.pollDirectMessages();
    } else if (endpoint.toLowerCase() === "tweet"){
      return this.pollTweets();
    }
  }
  pollMentions() {
    return Promise.resolve()
      .then(() => {
        let endpointMeta = this._context.subscription.get('mentions');
        if (!endpointMeta) {
          endpointMeta = {}
        }
        let path = "/statuses/mentions_timeline.json?contributor_details=true";
        if (endpointMeta.lastId) {
          path = path + "&since_id=" + endpointMeta.lastId;
        }
        return this._connector.get(path)
          .then((mentions) => {
            this._logger.info({
              mentions: mentions.length
            }, 'got mentions');
            if (mentions.length > 0) {
              let latest = mentions[0];
              this._logger.info('processing mentions');
              return Promise.all(mentions.map((mention) => {

                if (endpointMeta && mention.id > endpointMeta.lastId) {
                  if (mention.id > latest.id) {
                    this._logger.info({
                      id: mention.id
                    }, 'updating id');
                    latest = mention;
                  }
                  this._logger.info('processing mention');
                  return this.processMention(mention);
                } else {
                  this._logger.info({
                    mention: mention
                  }, 'mention id was less than last id')
                }
              })).then(() => {
                endpointMeta.lastId = latest.id;
                return this._context.subscription.set('mentions', endpointMeta);
              });
            } else {
              this._logger.info('no mentions to process');
            }
          });
      })
  }
  processMention(mention) {
    this._logger.info({
      mention: mention.id
    }, 'raising event for new mention');
    var eventName = `${this._context.connectorKey}:new:mention`;
    return this.emit(eventName, mention);
  }
  pollTweets() {
    return Promise.resolve()
      .then(() => {
        let endpointMeta = this._context.subscription.get('tweets');
        if (!endpointMeta) {
          endpointMeta = {}
        }
        let path = "/statuses/user_timeline.json?contributor_details=true";
        if (endpointMeta.lastId) {
          path = path + "&since_id=" + endpointMeta.lastId;
        }
        return this._connector.get(path)
          .then((mentions) => {
            this._logger.info({
              mentions: mentions.length
            }, 'got mentions');
            if (mentions.length > 0) {
              let latest = mentions[0];
              this._logger.info('processing mentions');
              return Promise.all(mentions.map((mention) => {

                if (endpointMeta && mention.id > endpointMeta.lastId) {
                  if (mention.id > latest.id) {
                    this._logger.info({
                      id: mention.id
                    }, 'updating id');
                    latest = mention;
                  }
                  this._logger.info('processing mention');
                  return this.processMention(mention);
                } else {
                  this._logger.info({
                    mention: mention
                  }, 'mention id was less than last id')
                }
              })).then(() => {
                endpointMeta.lastId = latest.id;
                return this._context.subscription.set('tweets', endpointMeta);
              });
            } else {
              this._logger.info('no tweets to process');
            }
          });
      })
  }
  processTweet(tweet) {
    this._logger.info({
      mention: mention.id
    }, 'raising event for new tweet');
    var eventName = `${this._context.connectorKey}:new:tweet`;
    return this.emit(eventName, tweet);
  }
}

export default function (context, raiseMethod) {
  let poller = new TwitterPoller(context);
  poller.emit = raiseMethod;
  return poller.poll();
};
