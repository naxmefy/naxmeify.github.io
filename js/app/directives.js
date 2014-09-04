angular.module('naxmeify')
.directive('scrollTo', function ($location, $anchorScroll) {
  return function(scope, element, attrs) {

    element.bind('click', function(event) {
        event.stopPropagation();
        var off = scope.$on('$locationChangeStart', function(ev) {
            off();
            ev.preventDefault();
        });
        var location = attrs.scrollTo;
        $location.hash(location);
        $anchorScroll();
        setTimeout(function(){ 
          window.scrollTo(window.pageXOffset, window.pageYOffset - 120);
        }, 0);
    });

  };
})
.directive('typeOfCvEntry', [function () {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) {
            console.log(iAttrs.typeOfCvEntry);
            switch(iAttrs.typeOfCvEntry) {
                case 'school':
                    iElement.addClass('glyphicon-check');
                    break;
                case 'vocational_training':
                    iElement.addClass('glyphicon-bookmark');
                    break;
                case 'study':
                    iElement.addClass('glyphicon-book');
                    break;
                case 'job':
                    iElement.addClass('glyphicon-briefcase');
                    break;
            }
        }
    };
}]);