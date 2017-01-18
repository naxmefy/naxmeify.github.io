angular.module('app')
  .factory('FeedService', ['' +
  '$http', function ($http) {
    return {
      parseFeed: function (url) {
        return $http.get('https://api.rss2json.com/v1/api.json?rss_url='+ encodeURIComponent(url));
      }
    }
  }]);
