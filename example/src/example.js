$(function () {

  var dropdown = new SelectDropdown({
    $element: $('#mySelectDropdown'),
    $container: $('.body'),
    getText: function (dropdown, e) {
      return 'Hello World';
    }
  });

});
