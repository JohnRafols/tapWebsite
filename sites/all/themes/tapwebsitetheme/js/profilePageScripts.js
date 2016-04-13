(function ($) {

 
/**
    _____________________________________
        

        Code for all profile pages
    

    _____________________________________
*/


  Drupal.behaviors.changeUsernameAppearance = {
      attach: function (context, settings) {
        //Lets get the user's profile information first.
        var profileName = $(context)
                                  .find('.page-user')
                                  .find('.l-region--sidebar-first')
                                  .find('.views-field-name')
                                  .find('.field-content');

        var str = profileName.text();
        var userName_noUnderscores = str.replace(/_/g, " "); 

        //Remove the underscores on user profiles (appearance only, no database)
        profileName.once('changeUsernameAppearance').html(userName_noUnderscores);
      }   
  };

})(jQuery);
