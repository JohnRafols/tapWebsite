(function ($) {


   
  Drupal.theme.prototype.tapwebsitethemeExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };


 
  Drupal.behaviors.registrationModalBehaviour = {
    attach: function (context, settings) {

      //This Button is for opening the Modal.
      $('<button class="btn registrationModal_Button" data-toggle="modal" data-target="#myModal">')   
                 .html("Register")
                 .appendTo(".page-freelancer-register .l-content");

      //This is code for cloning the Create an Account Button
      var createAccountDiv = $(".page-freelancer-register #edit-actions").clone(); 

      //Remove the existing button.      
      $(".page-freelancer-register #edit-actions").remove();

      //Give the Modal the Button required
      var modalButtonCode = '<div class="modal-footer registrationModal_footer">' + 
      createAccountDiv[0].outerHTML + '</div>';

      //This is HTML for creating a Bootstrap Model
      //There are cleaner ways to do this. Such as loading the html code in a seperate file
      var modalCode = '<div id="myModal" class="modal fade modalRegistration" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header registrationModal_header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title registrationModal_title">Tap Creative</h4></div><div class="modal-body registrationModal_body"><div class= "registrationModal_body_image"></div><div class= "registrationModal_body_thankYouMessage"><br/>Thank You for registering with Tap!</div><div class = "registrationModal_body_message"><br/>By working with us you are committing to quality and timely services to clients every time.<br/><br/>Tap is a curated community of Creative Professionals. Please note that all new profiles get checked for quality before going live.</div></div>' + 

       modalButtonCode +

      '</div></div></div>';

      //Add the modal to the page
      $('.page-freelancer-register #user-register-form').append(modalCode);
    
      //THESE ATTRIBUTES open up the modal 
      $(".page-freelancer-register #edit-submit[value = 'Create new account']")
        .attr('data-toggle','modal')
        .attr('data-target','#myModal');

  
      //For safety, you can chain your selection of classes/id's
      //I can use .click() to simulate a click;
      //$(".page-freelancer-register").find(".l-main").find(".l-content").append($customDialog);

    }   
};

})(jQuery);
