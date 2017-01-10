angular.module('app')
  .config([
    '$interpolateProvider',
    function ($interpolateProvider) {
      return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
  ]);
