(function ($) {

 
  Drupal.behaviors.registrationModalBehaviour = {
    attach: function (context, settings) {

      //Make sure everything is kept in the right page, as well as inside l-content
      var freelancerRegistrationPage = $('.page-freelancer-register').find('.l-content');
      
      //Append text to the header
      freelancerRegistrationPage.find('h1').once('freelancerRegistration').wrap('<div id = "newFreelancer_titleDiv"><div></div></div>')
         .after('<div id = "registrationPage_subtitle" > Work on exciting projects and keep your freedom </p>')

      var passwordSection = freelancerRegistrationPage.find('#edit-account')
                                   .find('.form-item-pass')

      //This Button is for opening the Modal.
      var newButton = $('<button id = "customPopUpButton" class="btn registrationModal_Button" data-toggle="modal" data-target="#myModal">')   
                 .html("Register")

      newButton.once('myButton', function(){
            if(freelancerRegistrationPage.find('#customPopUpButton').length == 0)
               newButton.appendTo(freelancerRegistrationPage);
      })
                 
      //This is code for cloning the Create an Account Button
      var createAccountDiv = freelancerRegistrationPage.find("#edit-actions").clone(); 

      //Remove(hide) the existing button. (We may need to simulate its action later if forms are not filled)      
      freelancerRegistrationPage.find("#edit-actions").hide();

      //When the button is clicked...
      var isfilled = true;
      freelancerRegistrationPage.find('#customPopUpButton').click(function(e){

        //If the required forms are not filled, then use the original buttons code
            freelancerRegistrationPage.find('form .required').each(function(index, value){
                // There are three forms, select, input, and checkbox.
                // If it's an INPUT field
                if(String($(this).prop("tagName")) == 'INPUT'){
                  // Check if it's a checkbox
                  if($(this).attr('type') == 'checkbox'){
                      if($(this).prop('checked') == false){
                         isfilled = false;
                      }
                  }
                  else if(!$(this).val()){
                      isfilled = false;
                      console.log($(this).val())
                  }   
                }
            });

          //if isfilled returns false, then don't bother with the modal
          //simulate the original button's purpose
          if(!isfilled){              
              freelancerRegistrationPage.find('#edit-actions').find('#edit-submit').click();
          }

          else{

            //Give the Modal the Button required
                var modalButtonCode = '<div class="modal-footer registrationModal_footer">' + 
                createAccountDiv[0].outerHTML + '</div>';

                //This is HTML for creating a Bootstrap Model
                //There are cleaner ways to do this. Such as loading the html code in a seperate file
                var modalCode = '<div id="myModal" class="modal fade modalRegistration" data-backdrop="static" data-keyboard="false" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header registrationModal_header"><div class="modal-title registrationModal_title"></div></div><div class="modal-body registrationModal_body"></div>' + 

                 modalButtonCode +

                '</div></div></div>';

                //Add the modal to the page
                freelancerRegistrationPage.find('form').append(modalCode);
                freelancerRegistrationPage.find('.registrationModal_footer').find('input').attr('value', 'Create Portfolio')

                //THESE ATTRIBUTES open up the modal 
                $(this)
                  .attr('data-toggle','modal')
                  .attr('data-target','#myModal');
              }
          })      
    }   
};

})(jQuery);
