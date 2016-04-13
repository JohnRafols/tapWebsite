(function ($) {
  /**
   * Provide summary information for vertical tabs.
   */
  Drupal.behaviors.rules_block_visibility = {
    attach: function (context) {
      // Provide summary when editting visibility..
      $('fieldset#edit-rules', context).drupalSetSummary(function(context) {
        var $opt = $("fieldset#edit-rules select#edit-rule option:selected");

        var value = $opt.attr('value');
        var text = $opt.text();

        if (value) {
          return Drupal.t('Restricted by rule %rule', {'%rule': text});
        }
        return Drupal.t('Not restricted');
      });
    }
  };

})(jQuery);
