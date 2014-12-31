# select-dropdown

A dropdown with a &lt;select&gt; element for the toggle. You can put whatever you want in the body.

## bower

This is not registered with the bower registry. You'll need to install with
git user/repo instead of package name:

```shell
bower install --save deseretdigital-ui/select-dropdown
```

---
__NOTE__: This library is subject to drastic changes in future version. It might
be a good idea to specify a version to install.
___


## usage

Include the styles and script in your document, setup html like so:

```html
  <div class="select-dropdown my-select-dropdown" id="mySelectDropdown">
    <div class="select-dropdown__control select-dropdown__toggle">
      <select>
        <option class="select-dropdown__control-text">Select</option>
      </select>
    </div>
    <div class="select-dropdown__dropdown">
      <!-- ... custom dropdown content ... -->
    </div>
  </div>
```

And initialize in javascript:

```javascript
$(function () {

  var dropdown = new SelectDropdown({
    $element: $('#mySelectDropdown'),
    $container: $('.body'),
    getText: function (dropdown, e) {
      var text = 'Select Stuff ...';

      // ... custom logic to determine text ...

      return text;
    }
  });

});
```
