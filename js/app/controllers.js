'use strict';

function HomeCtrl($scope, $http, $rootScope) {
  $rootScope.sitetitle = "Naxmeify";
}

function WorkCtrl($scope, $http, $rootScope) {
  $rootScope.sitetitle = "Naxmeify | my works";
  $http({method: 'GET', url: '/data/works.json'}).
  success(function(data, status, headers, config) {
    // console.log(data);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    var types = [];
    
    angular.forEach(data, function(value, key){
      angular.forEach(value.types, function(value, key){
        if($.inArray(value, this) === -1)
          this.push(value);
      }, this);
    }, types);

    $scope.works = data;
    $scope.types = types;
    setTimeout(function () {
        $scope.$apply(function () {
            $('#worksgrid').mixitup();
        });
    }, 100);
    
  }).
  error(function(data, status, headers, config) {
    console.log("errr");
  });
}

function SkillsCtrl($scope, $http, $rootScope) {
  $rootScope.sitetitle = "Naxmeify | my skills";
  $http({method: 'GET', url: '/data/skills.json'}).
  success(function(data, status, headers, config) {
    // console.log(data);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    $scope.skillareas = data;
  }).
  error(function(data, status, headers, config) {
    console.log("errr");
  });

   $scope.progressBarType= function(skillValue){
     if(skillValue>80)
            return "progress-bar-success"
     else if(skillValue>50)
         return "progress-bar-warning";
     else
         return "progress-bar-danger";
    }
}
function ContactCtrl($scope, $http, $timeout, $rootScope) {
   $rootScope.sitetitle = "Naxmeify | contact me";
   $('#contactMessage').css('overflow', 'hidden').autogrow();

   $scope.sendMail = function() {

    var url = '/mailapi/sendmail.php?';
    url += 'name='+$scope.name;
    url += '&email='+$scope.email;
    url += '&subject='+$scope.subject;
    url += '&message='+$scope.message;

    $http({
      url: url,
      method: 'GET'
    }).
    success(function(data, status, headers, config){
      if(data == "-1")
        $('#error').show();
      else
        $('#success').show();
      $('#contactform').hide();
    }).
    error(function(){
      $('#error').show();
      $('#contactform').hide();
    });
   };
   $scope.back = function() {
      $('#error').hide();
      $('#success').hide();
      $('#contactform').show();
   };
}