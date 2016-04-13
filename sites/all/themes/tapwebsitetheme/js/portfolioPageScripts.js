(function ($) {


 
//   Drupal.behaviors.backToProfile = {
//     attach: function (context, settings) {
//       //Lets get the user's profile information first.
//       var profilePicture = $('.l-main')
//                                 .find('.view-id-portfolio-header')
//                                 .find('.views-row')
//                                 .find('.views-field-field-profile-picture');
//       //console.log(profilePicture);
//     }   
// };



 Drupal.behaviors.changeUsernameAppearance = {
      attach: function (context, settings) {
        //Lets get the user's profile information first.
        var profileName = $(context)
                                  .find('.l-region--sidebar-first')
                                  .find('.views-field-name')
                                  .find('.username');


        var str = profileName.text();
        var userName_noUnderscores = str.replace(/_/g, " "); 

        //Remove the underscores on user profiles (appearance only, no database)
        profileName.once('changeUsernameAppearance').html(userName_noUnderscores);
      }   
  };


})(jQuery);
