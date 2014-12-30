$(function () {

  var dropdown = new SelectDropdown({
    $element: $('#mySelectDropdown'),
    $container: $('.body'),
    getText: function (dropdown, e) {
      var text = 'Select Stuff ...';

      var $checked = $(dropdown.$body).find(':checked');
      if ($checked.length > 0) {
        text = $checked.length + ' items selected!';
      }

      return text;
    }
  });

});
