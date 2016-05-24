(function ($) {


    /**
        _____________________________________
            
            Code for the My Jobs Page(s):    
        _____________________________________
    */

    Drupal.behaviors.myJobsPageBehavior = {    
    attach: function (context, settings) {
      
        var myJobsPage = $('.node-type-page.section-jobs').find('.l-content');
        // Align the h1 tag With the tabs
        //myJobsPage.find('h1').wrap('<div id = "tabsParentDiv">');

        var header = myJobsPage.find('h1');

        myJobsPage.find('ul.quicktabs-tabs')
                  .once('myJobsPageBehavior')
                  .wrap('<div id = "tabsParentDiv">')
                  .before(header);

      }
    };


/**
    _____________________________________
        

        Code for the Create New Job Page(s):    
    

    _____________________________________
*/

   var isLoadedJobPage = false;
    //This assures certain code is only loaded once
   //This code is custom jQuery for the forms of the website.  
   Drupal.behaviors.newJobPageBehaviour = {    
    attach: function (context, settings) {
      
        // //This is for the styling the "Edit Portfolio" page. 
        var newJobPage = $('.page-node-add.page-node-add-job').find('.l-content');
  
        //The Title and image associated
        newJobPage.find('h1')
                        .once('newJobPageBehaviour')
                        .wrap('<div class="row" id = "newJob_titleDiv"><div></div></div>')

        newJobPage.find('#newJob_titleDiv')
                        .once('newJobPageBehaviour')
                        .prepend('<div id = "newJob_Logo"></div>')

        //Overview section
        var portfolioPage_overviewBody = newJobPage.find('#edit-body')
                                                            .find('.form-textarea-wrapper')                      
        //Move the description of the Overview above the textArea and below the label.
        newJobPage.find('#edit-body')
                        .find('.description')
                        .once('newJobPageBehaviour')
                        .insertBefore(portfolioPage_overviewBody);

        //Increase the column gutter for the form:
        //editPortfolioPage.find('form').once('newJobPageBehaviour').wrapAll('<div id= "newPortfolio_gutterDiv">')

        // Get the lists of Skills
        var skillList = newJobPage
                              .find('#edit-field-service-type-und')
                              .find('.form-item');

        skillList.once('newJobPageBehaviour').wrapAll('<div class="projectSkillListRow row"></div>')

        //Calculate the number of items that'll appear in each column
        var skillsColumnSize = Math.floor(skillList.length/2 + skillList.length%2);

        //Add em all into the columns
        if(!isLoadedJobPage){
          for(var i = 0; i < skillList.length; i+=skillsColumnSize){
             skillList.slice(i, i+skillsColumnSize).wrapAll('<div class="col-sm-6"></div>');
          }
          isLoadedJobPage = true;
        }

        //Move the description of the Skill List above the checkboxes and below the label
        newJobPage.find('#edit-field-portfolio-project-skills')
                           .find('.description')
                           .insertBefore($('.projectSkillListRow'));


        var styleNames = newJobPage.find('.field-group-fieldset')
                  .find('.form-item')
                  .find('label');


        // for(var i= 0; i<styleNames.length; i++){  
        //   var name = $(styleNames[i]).html();
        //   //Go through each word
        //   var arrayName = name.split(" ");
        //   //Replace each label by adding three more
        // }
        

        //Move the labels under the fieldset
      }
    };


/**
    _____________________________________
        

        Code for the Edit New Job Page(s):    
    

    _____________________________________
*/




/**
    _____________________________________
        

        Code for Specific Job Page(s):    
    

    _____________________________________
*/


  
    Drupal.behaviors.specificJobPageBehavior = {    
    attach: function (context, settings) {
      
        var myJobsPage = $('.node-type-page.section-jobs').find('.l-content');
        // Align the h1 tag With the tabs
        //myJobsPage.find('h1').wrap('<div id = "tabsParentDiv">');

        var header = myJobsPage.find('h1');

        myJobsPage.find('ul.quicktabs-tabs')
                  .once('myJobsPageBehavior')
                  .wrap('<div id = "tabsParentDiv">')
                  .before(header);


        //Testing AJAX load...
        //myJobsPage.load("/sites/all/themes/tapwebsitetheme/js/CustomHTML/PopUps.html");


      }
    };



/**
    _____________________________________
        

        Code for the Job List page:    
    

    _____________________________________
*/


  
    // Drupal.behaviors.listOfJobsBehavior = {    
    // attach: function (context, settings) {
      
    //     var myJobsPage = $('.page-list-of-jobs').find('.l-content');
    //     // Align the h1 tag With the tabs
    //     //myJobsPage.find('h1').wrap('<div id = "tabsParentDiv">');

    //     var header = myJobsPage.find('h1');

    //     myJobsPage.find('ul.quicktabs-tabs')
    //               .once('myJobsPageBehavior')
    //               .wrap('<div id = "tabsParentDiv">')
    //               .before(header);


    //     //Testing AJAX load...
    //     //myJobsPage.load("/sites/all/themes/tapwebsitetheme/js/CustomHTML/PopUps.html");


    //   }
    // };




})(jQuery);


