(function ($) {

  /**
   * The recommended way for producing HTML markup through JavaScript is to write
   * theming functions. These are similiar to the theming functions that you might
   * know from 'phptemplate' (the default PHP templating engine used by most
   * Drupal themes including Omega). JavaScript theme functions accept arguments
   * and can be overriden by sub-themes.
   *
   * In most cases, there is no good reason to NOT wrap your markup producing
   * JavaScript in a theme function.
   */
  Drupal.theme.prototype.tapwebsitethemeExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };

  /**
   * Behaviors are Drupal's way of applying JavaScript to a page. In short, the
   * advantage of Behaviors over a simple 'document.ready()' lies in how it
   * interacts with content loaded through Ajax. Opposed to the
   * 'document.ready()' event which is only fired once when the page is
   * initially loaded, behaviors get re-executed whenever something is added to
   * the page through Ajax.
   *
   * You can attach as many behaviors as you wish. In fact, instead of overloading
   * a single behavior with multiple, completely unrelated tasks you should create
   * a separate behavior for every separate task.
   *
   * In most cases, there is no good reason to NOT wrap your JavaScript code in a
   * behavior.
   *
   * @param context
   *   The context for which the behavior is being executed. This is either the
   *   full page or a piece of HTML that was just added through Ajax.
   * @param settings
   *   An array of settings (added through drupal_add_js()). Instead of accessing
   *   Drupal.settings directly you should use this because of potential
   *   modifications made by the Ajax callback that also produced 'context'.
   */

  Drupal.behaviors.tapwebsitethemeExampleBehavior = {
    attach: function (context, settings) {
      // By using the 'context' variable we make sure that our code only runs on
      // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
      // we don't run the same piece of code for an HTML snippet that we already
      // processed previously. By using .once('foo') all processed elements will
      // get tagged with a 'foo-processed' class, causing all future invocations
      // of this behavior to ignore them.
      $('.some-selector', context).once('foo', function () {
        // Now, we are invoking the previously declared theme function using two
        // settings as arguments.
        var $anchor = Drupal.theme('tapwebsitethemeExampleButton', settings.myExampleLinkPath, settings.myExampleLinkTitle);

        // The anchor is then appended to the current element.
        $anchor.appendTo(this);
      });
    }
  };


/**
    _____________________________________





    This is Where the custom code begins




    _____________________________________
*/



/**
    _____________________________________
        

        Code for the Navbar:    
    

    _____________________________________
*/


   Drupal.behaviors.navbarBehaviour = {    
    attach: function (context, settings) {
    
        //This is the main navigation bar on every page
        var mainNavigationBar = $(".l-header")
                                  .find(".l-region--navigation")
                                  .find("#block-system-main-menu")

        //Append the Logo (Once only!)
        mainNavigationBar.once('navbarBehaviour').prepend('<div class="navbar-header"><button type="button" class="navbar-toggle" id="collapseButtonCustom" data-toggle="collapse" data-target="#myNavbar"></button><a class="navbar-brand" id= "tapLogo" href="/"></a></div>');
        //mainNavigationBar.addClass('navbar-fixed-top'); 

        //This is the list of links
        var mainNavigationBar_Links = $(".l-header")
                                  .find(".l-region--navigation")
                                  .find("#block-system-main-menu")
                                  .find(".menu");

        //State that the navigation is collapsable (Once only!)
        mainNavigationBar_Links.once('navbarBehaviour').wrap("<div class='collapse navbar-collapse' id='myNavbar'>") ;

        // Contact Us is a dead link, give it the proper attribute
        // mainNavigationBar_Links.find('a:contains("Contact")')
        //                         .once('navbarBehaviour')
        //                         .attr('href','#contactUs')

        //Any "Clients" link on the page should open up the pop up
        mainNavigationBar_Links.find('a:contains("Clients")')
                                .once('navbarBehaviour')
                                .attr('data-toggle','modal')
                                .attr('data-target','#emailSignUpModal');                               


        //An attempt to style to menu with borders to further match Denny's work
        mainNavigationBar_Links.find('.leaf')
                                .once('navbarBehaviour')
                                .append('<div class = "borderForMenu">')

          
        //This is for the mailchimp form
        //It's always going to be in the navbar. 


        //Note, this "ChimpFormExistance" is for extra assurance the code doesn't go to pages it shouldn't.
        var ChimpFormExistance = $('.l-header')
                                .find('.l-region--navigation')
                                .find("#mailchimp-signup-subscribe-block-client-subscribe-form").length

        if(ChimpFormExistance == 1){
            var mailChimpForm = $('.l-header')
                                    .find('.l-region--navigation')
                                    .find("#mailchimp-signup-subscribe-block-client-subscribe-form").clone()

            //Although the form will always be on the page, we will hide it. 
            $('.l-header')
                  .find('.l-region--navigation')
                  .find("#mailchimp-signup-subscribe-block-client-subscribe-form")
                  .remove();

            //The form will be placed in the footer section of the modal         
            var modalButtonCode = '<div class="modal-footer modalEmailSignUp_footer">' + 
                    mailChimpForm[0].outerHTML + '</div>';

            // This is HTML for creating a Bootstrap Model
            // There are cleaner ways to do this. Such as loading the html code in a seperate file
            var modalCode = '<div id="emailSignUpModal" class="modal fade modalEmailSignUp" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header modalEmailSignUp_header"><button type="button" class="close" data-dismiss="modal">&times;</button><div class="modal-title modalEmailSignUp_title"></div></div><div class="modal-body modalEmailSignUp_body"></div>' + 
                     modalButtonCode +
            '</div></div></div>';
     
            
            //Add the modal to the page
            $('.l-header').find('.l-region--navigation').append(modalCode)

        }
      }
    };



/**
    _____________________________________
        

        Code for the create Portfolio Page:    
    

    _____________________________________
*/



   //This assures certain code is only loaded once
    var isLoaded = false;
   //This code is custom jQuery for the forms of the website.  
   Drupal.behaviors.createPortfolioBehaviour = {    
    attach: function (context, settings) {
      
        // //This is for the styling the "Create Portfolio" page. 
        var createPortfolioPage = $('.page-node-add-portfolio').find('.l-content');
  

        //The Title and image associated
        createPortfolioPage.find('h1')
                        .once('createPortfolioBehaviour')
                        .wrap('<div class="row" id = "newPortfolio_titleDiv"><div></div></div>')

        createPortfolioPage.find('#newPortfolio_titleDiv')
                        .once('createPortfolioBehaviour')
                        .prepend('<div id = "newPortfolio_Logo"></div>')

        createPortfolioPage.find('h1').html('New Project');

        //Overview section
        var portfolioPage_overviewBody = createPortfolioPage.find('#edit-body')
                                                            .find('.form-textarea-wrapper')                      
        //Move the description of the Overview above the textArea and below the label.
        createPortfolioPage.find('#edit-body')
                        .find('.description')
                        .once('createPortfolioBehaviour')
                        .insertBefore(portfolioPage_overviewBody);

        // Get the lists of Skills
        var skillList = createPortfolioPage
                              .find('#edit-field-portfolio-project-skills-und')
                              .find('.form-item');

        skillList.once('createPortfolioBehaviour').wrapAll('<div class="projectSkillListRow row"></div>')

        //Calculate the number of items that'll appear in each column
        var skillsColumnSize = Math.floor(skillList.length/2) + ((skillList.length % 2)/2);

        //Add em all into the columns
        //once() isn't working here, so I used a boolean variable 
        if(!isLoaded){
          for(var i = 0; i < skillList.length; i+=skillsColumnSize){
             skillList.slice(i, i+skillsColumnSize).wrapAll('<div class="col-sm-6"></div>');
          }
          isLoaded = true;
        }

        //Move the description of the Skill List above the checkboxes and below the label
        createPortfolioPage.find('#edit-field-portfolio-project-skills')
                           .find('.description')
                           .insertBefore($('.projectSkillListRow'));

      }
    };


/**
    _____________________________________
        

        Code for the edit Portfolio Page:    
    

    _____________________________________
*/

   var isLoadedEditPortfolio = false;
    //This assures certain code is only loaded once
   //This code is custom jQuery for the forms of the website.  
   Drupal.behaviors.editPortfolioBehaviour = {    
    attach: function (context, settings) {
      
        // //This is for the styling the "Edit Portfolio" page. 
        var editPortfolioPage = $('.page-node-edit.node-type-portfolio').find('.l-content');
  

        //The Title and image associated
        editPortfolioPage.find('h1')
                        .once('editPortfolioBehaviour')
                        .wrap('<div class="row" id = "newPortfolio_titleDiv"><div></div></div>')

        editPortfolioPage.find('#newPortfolio_titleDiv')
                        .once('editPortfolioBehaviour')
                        .prepend('<div id = "newPortfolio_Logo"></div>')

        //editPortfolioPage.find('h1').html('Edit');

        //Overview section
        var portfolioPage_overviewBody = editPortfolioPage.find('#edit-body')
                                                            .find('.form-textarea-wrapper')                      
        //Move the description of the Overview above the textArea and below the label.
        editPortfolioPage.find('#edit-body')
                        .find('.description')
                        .once('editPortfolioBehaviour')
                        .insertBefore(portfolioPage_overviewBody);

        // Get the lists of Skills
        var skillList = editPortfolioPage
                              .find('#edit-field-portfolio-project-skills-und')
                              .find('.form-item');

        skillList.once('editPortfolioBehaviour').wrapAll('<div class="projectSkillListRow row"></div>')

        //Calculate the number of items that'll appear in each column
        var skillsColumnSize = Math.floor(skillList.length/2) + ((skillList.length % 2)/2);

        //Add em all into the columns
        //once() isn't working here, so I used a boolean variable 

        if(!isLoadedEditPortfolio){
           for(var i = 0; i < skillList.length; i+=skillsColumnSize){
              skillList.slice(i, i+skillsColumnSize).wrapAll('<div class="col-sm-6"></div>');
          }
          isLoadedEditPortfolio = true;
        }

        //Move the description of the Skill List above the checkboxes and below the label
        editPortfolioPage.find('#edit-field-portfolio-project-skills')
                           .find('.description')
                           .insertBefore($('.projectSkillListRow'));

      }
    };


})(jQuery);
