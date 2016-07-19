(function ($) {

/**
    _____________________________________
        

        Code for the gallery search page
    

    _____________________________________
*/

 Drupal.behaviors.galleryPageBehaviour = {
      attach: function (context, settings) {

      

        var galleryPage = $(".page-browseportfolios").find('.l-content');

        //I'm having trouble with the submit and reset buttons in the gallery page..
        galleryPage.find('.views-submit-button, .views-reset-button')
                   .once('galleryPageBehaviour')
                   .wrapAll('<div id="filterButtonsContainer"></div>');


 
        //Thanks to [#26] at https://www.drupal.org/node/1510526


          $(window).resize(function(){
            $('.views_slideshow_cycle_main').each(function(){
                var cycleMain = $(this);
                var img_width = 0,
                    img_height = 0;
                var clearCSS = {width: "auto", height: "auto"};
                var cycle = cycleMain.children('.views-slideshow-cycle-main-frame');
                cycleElements = cycle.data("cycle.opts");
                cycle.css(clearCSS);
                cycleMain.find('.views-slideshow-cycle-main-frame-row').each(function(i){
                  $(this).css(clearCSS);
                  var tmp_img_width = $(this).width();
                  var tmp_img_height = $(this).height();
                  if(tmp_img_width > img_width)
                    img_width = tmp_img_width;
                  if(tmp_img_height > img_height)
                    img_height = tmp_img_height;
                  cycleElements.elements[i].cycleW = tmp_img_width;
                  cycleElements.elements[i].cycleH = tmp_img_height;
                  $(this).css({width: tmp_img_width, height: tmp_img_height});
                });
                cycleMain.height(img_height);
                cycle.css({width: img_width, height: img_height});
                cycle.data("cycle.opts.elements", cycleElements);
              });
          });


      }   
  };

})(jQuery);
