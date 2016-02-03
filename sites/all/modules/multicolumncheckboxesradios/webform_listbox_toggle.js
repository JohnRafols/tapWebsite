
jQuery(function($) {

  var checkbox = $('#edit-extra-aslist');
  if (checkbox.is(':checked')) {
    $('#mccr-settings-fieldset').css('display', 'none');
  }

  checkbox.bind('change', function(event) {
    if ($(this).is(':checked')) {
      $('#mccr-settings-fieldset').hide('slow');
    } else {
      $('#mccr-settings-fieldset').show('slow');
    }
  });
  
});
