angular.module('app')
  .component('latestCodepens', {
    template: '<div class="list-group">' +
    '<h4><a href="{( $ctrl.link )}">Latest CodePens</a></h4>' +
    '<a class="list-group-item" ng-repeat="pen in $ctrl.pens | limitTo:10" ng-href="pen.link" target="_blank">{(pen.title)}</a>' +
    '</div>',
    controller: [
      'FeedService',
      function (FeedService) {
        FeedService.parseFeed('http://codepen.io/naxmefy/public/feed/')
          .then(function (response) {
            this.link = response.data.responseData.feed.link;
            this.pens = response.data.responseData.feed.entries;
          }.bind(this))
      }
    ]
  });
