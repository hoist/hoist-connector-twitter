module.exports = function (event) {
  return Hoist.bucket.set('default')
    .then(function () {
      var twitter = Hoist.connector('twitter');
      return twitter.get('/statuses/mentions_timeline.json?contributor_details=true');
    }).then(function (response) {
      Hoist.log(response);
    });
}
