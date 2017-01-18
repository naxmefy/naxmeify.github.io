angular.module('app')
  .factory('FeedService', ['' +
  '$http', function ($http) {
    return {
      parseFeed: function (url) {
        return $http.get('https://api.rss2json.com/v1/api.json?' +
          'api_key=jh6yds6n6pdzajcwbx7inxxey7ju5sgqel3srufw' +
          'order_dor=desc' +
          'count=10' +
          'rss_url=' +
          ''+ encodeURIComponent(url));
      }
    }
  }]);
