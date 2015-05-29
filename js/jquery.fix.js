jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());


String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/** FOR FILTERED VIEW */


jQuery(function() {
  function setupFilterInput(id) {
    $('#'+id+'Filter').keyup(function(event) {
      event.preventDefault();
      var element = event.currentTarget;
      var value = $(element).val().toLowerCase();
      $('#'+id+' .item').each(function(index, element) {
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

  if($('#skills').length > 0) {
    setupFilterInput('skills');
  }
  
  if($('#works').length > 0) {
    setupFilterInput('works');
    
    // Synchronize height of works
    var thumbnailHeight = 0;
    var headingHeight = 0;
    var textHeight = 0;
    var leadHeight = 0;
    
    $.each($('#works .item'), function(index, element) {
      //var thumbnailElement = $(element).find('.thumbnail');
      var headingElement = $(element).find('.name');
      var textElement = $(element).find('.text');
      var leadElement = $(element).find('.tags');
      
      //thumbnailHeight = thumbnailElement.height() > thumbnailHeight ? thumbnailElement.height() : thumbnailHeight;
      headingHeight = headingElement.height() > headingHeight ? headingElement.height() : headingHeight;
      textHeight = textElement.height() > textHeight ? textElement.height() : textHeight;
      leadHeight = leadElement.height() > leadHeight ? leadElement.height() : leadHeight;
    });
    
    setTimeout(function() {
      //console.log(thumbnailHeight);
      console.log(headingHeight);
      console.log(textHeight);
      console.log(leadHeight);
      
      //$('.gridview .item .thumbnail').height(thumbnailHeight);
      $('#works .item .name').height(headingHeight);
      $('#works .item .text').height(textHeight);
      $('#works .item .tags').height(leadHeight);
    }, 10);
  }
  
});