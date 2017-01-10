angular.module('app')
  .component('latestGithubActivities', {
    template: '<div class="list-group">' +
    '<h4><a href="{( $ctrl.link )}">Latest Github Activities</a></h4>' +
    '<a class="list-group-item" ng-repeat="pen in $ctrl.pens | limitTo:10" ng-href="pen.link" target="_blank">{(pen.title)}</a>' +
    '</div>',
    controller: [
      'FeedService',
      function (FeedService) {
        FeedService.parseFeed('https://github.com/naxmefy.atom')
          .then(function (response) {
            this.link = response.data.responseData.feed.link;
            this.pens = response.data.responseData.feed.entries;
          }.bind(this))
      }
    ]
  });
