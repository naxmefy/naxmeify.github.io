'use strict';

function HomeCtrl($scope, $http, $rootScope) {
  $rootScope.sitetitle = "Naxmeify - MRW Neundorf";
  $http({method: 'GET', url: '/data/skills.json'}).
  success(function(data, status, headers, config) {
    // console.log(data);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    $scope.skills = shuffle(data[0].items).slice(0, 5);
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

  $scope.mattimages = [1,2,3,4,5];

  $('.carousel').carousel();
  $('.carousel-control').click(function(e){
    e.preventDefault();
  });
}

function WorksCtrl($scope, $http, $rootScope) {
  $rootScope.sitetitle = "my works | Naxmeify";
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
  $rootScope.sitetitle = "my skills | Naxmeify";
  $http({method: 'GET', url: '/data/skills.json'}).
  success(function(data, status, headers, config) {
    // console.log(data);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    $scope.skillareas = data;

    $('body').scrollspy({ target: '.sidebar' });
  }).
  error(function(data, status, headers, config) {
    console.log("errr");
  });

  $scope.progressBarType= function(skillValue){

    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this).scrollspy('refresh')
    });
    if(skillValue>80)
          return "progress-bar-success"
    else if(skillValue>50)
       return "progress-bar-warning";
    else
       return "progress-bar-danger";
    }
}

function CVCtrl($scope, $http, $rootScope) {
  $rootScope.sitetitle = "my cv | Naxmeify";
  $http({method: 'GET', url: '/data/cv.json'}).
  success(function(data, status, headers, config) {
    // console.log(data);
    // console.log(status);
    // console.log(headers);
    // console.log(config);
    angular.forEach(data, function(value, key){
      var parts = value.start.split('/');
      value.date = new Date(parts[1],parts[0]-1);
    });
    $scope.entries = data;

    console.log(new Date(2008,08));
  }).
  error(function(data, status, headers, config) {
    console.log("errr");
  });
}

function ContactCtrl($scope, $http, $timeout, $rootScope) {
   $rootScope.sitetitle = "contact me | Naxmeify";
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

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
