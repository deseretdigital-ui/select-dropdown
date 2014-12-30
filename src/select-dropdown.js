var SelectDropdown = (function () {

  var SelectDropdown = function (params) {
    this.$element = params.$element;
    this.$toggle = this.$element.find('.select-dropdown__toggle');
    this.$control = this.$element.find('.select-dropdown__control');
    this.$body = this.$element.find('.select-dropdown__dropdown');
    this.$container = params.$container;
    this.$text = this.$element.find('.select-dropdown__control-text');
    this.getText = params.getText;

    /* add dropdown class so that other methods can rely on it's presence */
    this.$element.addClass('select-dropdown');

    /* attach reference to object for event handlers to be able to access */
    this.$element.data('select-dropdown', this);

    var dropdown = this;

    /* bind events */
    $(document).on('ready', function () {

      /* wire up toggle */
      dropdown.$toggle.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // avoid native select dropdown
        $(this).find('select').blur();

        // open ldropdown dropdown
        dropdown.toggle();
      });

      /* click outside to close */
      $(document).on('click.select-dropdown touchstart.select-dropdown', function (event) {
        var inDropdown = $(event.target).closest('.select-dropdown').length > 0;
        if (!inDropdown) {
          $('.select-dropdown').each(function (index, dropdown) { $(dropdown).data('select-dropdown').close(); });
        }
      });

    });

    // set text on certain events
    this.$element.on('change.select-dropdown', function () { this.handleChange(); }.bind(this));
    this.updateText();
  };

  SelectDropdown.prototype = {

    isMobile: function () {
      return $(window).width() < 768;
    },

    isOpen: function () {
      return this.$element.hasClass('select-dropdown--open');
    },

    open: function () {
      // close all other dropdowns
      $('.select-dropdown--open').not(this.$element).each(function (index, dropdown) { $(dropdown).data('select-dropdown').close(); });
      this.$element.addClass('select-dropdown--open');
      this.$body.slideDown(200);

      if (this.isMobile()) {
        this.scrollToToggle();
        this.lockScroll();
      }
    },

    close: function () {
      if (!this.isOpen()) {
        return; // nothing to do
      }
      $(':focus').blur();
      this.$body.slideUp(200);
      this.$element.removeClass('select-dropdown--open');

      if (this.isMobile()) {
        this.unlockScroll();
      }
    },

    toggle: function () {
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
      }
    },

    scrollToToggle: function () {
      var firstChildOffset = Math.floor(this.$container.find(":first-child").offset().top);
      var targetOffset = Math.floor(this.$element.eq(0).offset().top);
      var offset = 30;
      var scrollTop = targetOffset - firstChildOffset - offset;

      this.$container.animate({
        scrollTop: scrollTop
      }, 300);
    },

    lockScroll: function () {
      this.$container.addClass('ddm-menu-container__content--scroll-lock');
    },

    unlockScroll: function () {
      this.$container.removeClass('ddm-menu-container__content--scroll-lock');
    },

    handleChange: function (e) {
      this.updateText(e);
    },

    updateText: function (e) {
      this.$text.text(this.getText(this, e));
    }
  };

  return SelectDropdown;

})();
