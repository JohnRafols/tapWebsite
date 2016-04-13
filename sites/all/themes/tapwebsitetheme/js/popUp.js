(function ($) {

/**
    _____________________________________
        

        Code for the Client / Freelancer Registration Page : 

        Note: It should now work for the Client Registration as well, 
              some refactoring will be made to accomodate the two pages.
    
    _____________________________________
*/

  Drupal.behaviors.registrationModalBehaviour = {
    attach: function (context, settings) {

      // Before we run this code, we'll need to check if it is for the client or freelancer
      var freelancerRegistrationPage = null;
      var headerMessage = "";
      var modalButtonMessage = "";

      // Check for the page (is it the client registration or freelancer registration?)
      // Make sure everything is kept in the right page, as well as inside l-content

      if($(context).find('body').hasClass('page-freelancer-register')){
          freelancerRegistrationPage = $('.page-freelancer-register').find('.l-content');
          headerMessage = "Work on exciting projects and keep your freedom.";
          modalButtonMessage = "Create Portfolio";
      }
      else if($(context).find('body').hasClass('page-client-register')){
          freelancerRegistrationPage = $('.page-client-register').find('.l-content');
          headerMessage = "We'll flick you an e-mail when you can start working with kick ass creatives on Tap!";
          modalButtonMessage = " Portfolio";
      };


      if(freelancerRegistrationPage != null){

          //Append text to the header
          freelancerRegistrationPage.find('h1').once('freelancerRegistration').wrap('<div id = "newFreelancer_titleDiv"><div></div></div>')
             .after('<div id = "registrationPage_subtitle" >' + headerMessage +  '</p>');

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
                var modalBodyCode = '';
                var modalButtonCode = '<div class="modal-footer registrationModal_footer">' + createAccountDiv[0].outerHTML + '</div>';


                //Change the content of the modal depending if client or freelancer
                if($(context).find('body').hasClass('page-freelancer-register')){
                    //modalBodyCode = '<div class="modal-body registrationModal_body">    </div>';

                    modalBodyCode = '<div class="modal-body clientModal_body row"> <div class="col-sm-3 text-center"> <img alt="" src="/sites/default/files/tapCreativeImages/ClientProcess/Communicate.png" />  </div>  <div class="col-sm-9"> Your profile is currently pending approval </div> <div class = "col-sm-12"> Tap is a curated community of Creative Professionals. All new profiles get checked for quality before going live. </div> </div>'; 

                    //modalButtonCode = '<div class="modal-footer registrationModal_footer">' + createAccountDiv[0].outerHTML + '</div>';
                }
                else if($(context).find('body').hasClass('page-client-register')){
                    modalBodyCode = '<div class="modal-body clientModal_body row"> <div class="col-sm-3 text-center"> <img src="/sites/default/files/tapCreativeImages/CreativeProcess/CreateAPortfolio.png" />  </div>  <div class="col-sm-9"> Thanks for registering! We will be in touch very soon. </div> <div class = "col-sm-12 text-center"> Need a creative for a Project right now? <br> <a href="mailto:hello@tapcreative.services"> Flick us an email </a> </div> </div>'; 
                    //modalButtonCode = '';
                };



                    // This is HTML for creating a Bootstrap Model
                    // There are cleaner ways to do this. Such as loading the html code in a seperate file
                    var modalCode = '<div id="myModal" class="modal fade modalRegistration" data-backdrop="static" data-keyboard="false" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header registrationModal_header"><div class="modal-title registrationModal_title"></div></div>'
                    
                    // Content in Body
                    +  modalBodyCode  + 
                    // Content in footer
                     modalButtonCode +

                    '</div></div></div>';

                    //Add the modal to the page
                    freelancerRegistrationPage.find('form').append(modalCode);

                    //This changes the button in the footer's value
                    if($(context).find('body').hasClass('page-freelancer-register')){
                        freelancerRegistrationPage.find('.registrationModal_footer').find('input').attr('value', 'Create Portfolio')
                    }
                    else if($(context).find('body').hasClass('page-client-register')){
                        freelancerRegistrationPage.find('.registrationModal_footer').find('input').attr('value', 'Create Account')
                    };


                    //THESE ATTRIBUTES open up the modal 
                    $(this)
                      .attr('data-toggle','modal')
                      .attr('data-target','#myModal');
                  }
            })    

        }

    }   
  };


})(jQuery);
