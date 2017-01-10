angular.module('app')
  .component('latestGithubActivities', {
    template: '<div class="list-group">' +
    '<h4><a href="{( $ctrl.link )}">Latest Github Activities</a></h4>' +
    '<a class="list-group-item" ng-repeat="activity in $ctrl.activities | limitTo:10" ' +
    'ng-href="activity.link" target="_blank">{(activity.title)}</a>' +
    '</div>',
    controller: [
      'FeedService',
      function (FeedService) {
        FeedService.parseFeed('https://github.com/naxmefy.atom')
          .then(function (response) {
            this.link = response.data.responseData.feed.link;
            this.activities = response.data.responseData.feed.entries;
          }.bind(this))
      }
    ]
  });
