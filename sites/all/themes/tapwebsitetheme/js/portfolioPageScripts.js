(function ($) {


   
  Drupal.theme.prototype.tapwebsitethemeExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };


 
  Drupal.behaviors.backToProfile = {
    attach: function (context, settings) {
      //Lets get the user's profile information first.
      var profilePicture = $('.l-main')
                                .find('.view-id-portfolio-header')
                                .find('.views-row')
                                .find('.views-field-field-profile-picture');
      console.log(profilePicture);
    }   
};

})(jQuery);
