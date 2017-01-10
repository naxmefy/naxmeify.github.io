angular.module('app')
  .component('latestGists', {
    template: '<div class="list-group">' +
    '<h4><a href="{( $ctrl.link )}">Latest Gists</a></h4>' +
    '<a class="list-group-item" ng-repeat="gist in $ctrl.gists | limitTo:10" ng-href="gist.link" target="_blank">{(gist.title)}</a>' +
    '</div>',
    controller: [
      'FeedService',
      function (FeedService) {
        FeedService.parseFeed('https://gist.github.com/naxmefy.atom')
          .then(function (response) {
            this.link = response.data.responseData.feed.link;
            this.gists = response.data.responseData.feed.entries;
          }.bind(this))
      }
    ]
  });
