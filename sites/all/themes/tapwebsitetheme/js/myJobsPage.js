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

Drupal.behaviors.creativeProSelectionBehaviour = {
    attach: function (context, settings) {

        // Checkboxes.
        var inviteCheckbox = $('#edit-field-freelancer-selection-und-invite');
        var commissionCheckbox = $('#edit-field-freelancer-selection-und-commission');        
        var matchCheckbox = $('#edit-field-freelancer-selection-und-match');
        var firstCandCheckbox = $('#edit-field-freelancer-selection-und-first-candidate');
        var longTermProjChechbox = $('#edit-field-freelancer-selection-und-long-term');

        // Textboxes.
        var inviteTextbox = $('#edit-field-invited-candidates');
        var commissionTextbox = $('#edit-field-commissioned-candidate');

        // Hide both textboxes initially.
        inviteTextbox.once("creativeProSelectionBehaviour").hide();
        commissionTextbox.once("creativeProSelectionBehaviour").hide();

        var matchAndInviteCallback = function() {
            console.log("callback");
            if(matchCheckbox.is(':checked') || inviteCheckbox.is(':checked')){
                disableAllCheckboxes();
                matchCheckbox.attr('disabled', false);
                inviteCheckbox.attr('disabled', false);

                commissionTextbox.hide();

                if(inviteCheckbox.is(':checked')){
                    inviteTextbox.appendTo(".form-item-field-freelancer-selection-und-invite");
                    inviteTextbox.show();    
                }                
                
            }else{
                inviteTextbox.hide();
                enableAllCheckboxes();
            }
        };

        inviteCheckbox.once("creativeProSelectionBehaviour").change(matchAndInviteCallback);
        matchCheckbox.once("creativeProSelectionBehaviour").change(matchAndInviteCallback);

        commissionCheckbox.once("creativeProSelectionBehaviour").change(function() {
            console.log("this.checked: " + this.checked);
            if(this.checked){
                disableAllCheckboxes();
                commissionCheckbox.attr('disabled', false);
                commissionTextbox.appendTo(".form-item-field-freelancer-selection-und-commission");
                commissionTextbox.show();
                inviteTextbox.hide();
            }else{
                commissionTextbox.hide();
                enableAllCheckboxes();
            }
        });    

        firstCandCheckbox.once("creativeProSelectionBehaviour").change(function(){
            if(this.checked){
                disableAllCheckboxes();
                firstCandCheckbox.attr("disabled", false);
            }else{
                enableAllCheckboxes();
            }
        });

        longTermProjChechbox.once("creativeProSelectionBehaviour").change(function(){
            if(this.checked){
                disableAllCheckboxes();
                longTermProjChechbox.attr("disabled", false);
            }else{
                enableAllCheckboxes();
            }
        });

        var enableAllCheckboxes = function(){
            inviteCheckbox.attr('disabled', false);
            commissionCheckbox.attr('disabled', false);
            matchCheckbox.attr('disabled', false);
            firstCandCheckbox.attr('disabled', false);
            longTermProjChechbox.attr('disabled', false);
        };

        var disableAllCheckboxes = function(){
            inviteCheckbox.attr('disabled', true);
            commissionCheckbox.attr('disabled', true);
            matchCheckbox.attr('disabled', true);
            firstCandCheckbox.attr('disabled', true);
            longTermProjChechbox.attr('disabled', true);
        };

    }
};


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
                  .once('specificJobPageBehavior')
                  .wrap('<div id = "tabsParentDiv">')
                  .before(header);

        //Testing AJAX load...
        //myJobsPage.load("/sites/all/themes/tapwebsitetheme/js/CustomHTML/PopUps.html");

        //This is code for the first half of the workroom (Freelance info, etc)
        var freelancerInfo = $('#block-tap-job-mgmt-tap-block')
                                .find('.form-item-freelancer-choice')
                                .find('#edit-freelancer-choice')

        
        var input = freelancerInfo.find(".form-radio");
        var options = freelancerInfo.find(".option");

        //Add input button to the right side:
        input.each(function(index){
                $(options[index]).once('specificJobPageBehavior')
                      .after($(input[index]));
        });

        //Add div wrappers
        freelancerInfo.find('.form-item-freelancer-choice')
                      .once('specificJobPageBehavior')
                      .wrap('<div class="parentColumn">')

      
        //Add a borderline between the button and freelancerInfo
        freelancerInfo.once('specificJobPageBehavior')
                      .after('<div id = "borderfreelancerInfo">')

        //Remove underscores
        // http://stackoverflow.com/questions/5232862/jquery-change-inner-text-but-preserve-html

        var link = freelancerInfo.find('a');
        var image = freelancerInfo.find('a').find('img');
        
        link.each(function(index){
            var str = $(link[index]).text();
            var userName_noUnderscores = str.replace(/_/g, " "); 
            $(link[index]).html(userName_noUnderscores);
            $(link[index]).prepend($(image[index]));
        })

        if($('#freelancerInfoHeader_title').length){
            $('#freelancerInfoHeader_title').once('specificJobPageBehavior').html($('h1'));
        }


     
 
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


