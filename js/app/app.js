'use strict';
var app = angular.module('naxmeify', []).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
          when('/', { templateUrl: 'partials/index.html', activetab: 'home', controller: HomeCtrl }).
          when('/about', {
              templateUrl: 'partials/about.html',
              controller: AboutCtrl,
              activetab: 'about'
          }).
          when('/work', {
              templateUrl: 'partials/work.html',
              controller: WorkCtrl,
              activetab: 'work'
          }).
          when('/contact', {
              templateUrl: 'partials/contact.html',
              controller: ContactCtrl,
              activetab: 'contact'
          }).
          otherwise({ redirectTo: '/' });
  }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

    
      $scope.$on("$routeChangeSuccess", function (scope, next, current) {
          $scope.part = $route.current.activetab;
          $scope.transitionState = "active";
      });


      $scope.save = function () {
          $scope.loaded = true;
          $scope.process = true;
          $http.post('/home/sendemail', $scope.message).success(function () {
              $scope.success = true;
              $scope.process = false;
          });
      };
  }]);

app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);