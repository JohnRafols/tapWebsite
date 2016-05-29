(function ($) {

/**
    _____________________________________
        

        Code for the gallery search page
    

    _____________________________________
*/

 Drupal.behaviors.galleryPageBehaviour = {
      attach: function (context, settings) {

        // //Lets get the featured list block
        //var featuredBlock = $(context).find('#views-form-featured-block')


        // var imageField = featuredBlock.find('.views-field-field-images')
        //                               .find('.field-content');

        // //This is too help styling the featured bloack
        // imageField.find('a:nth-child(1)').wrapAll('<div id="primaryImage">');
        // imageField.find('a').not('a:nth-child(1)').wrapAll('<div id="otherImages">');

        // featuredBlock.find('.views-slideshow-controls-bottom')
        //             $(context)
        //              .find('.views-content-counter')
        //              .once('galleryPageBehaviour').html('');
 
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
