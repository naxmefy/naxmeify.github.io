jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());


String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/** FOR SKILLS VIEW */
jQuery(function() {
  if($('#skills').length > 0) {
    $('#skillsFilter').keyup(function(event) {
      event.preventDefault();
      var element = event.currentTarget;
      var value = $(element).val().toLowerCase();
      $('#skills .skill').each(function(index, element) {
        var name = $(element).find('.name').text().toLowerCase();
        if(value.length > 0) {
          if((name.indexOf(value) !== -1)) {
            $(element).show();
          } else {
            $(element).hide();
          }
        } else {
          $(element).show();
        }
      });
    });
  }
});