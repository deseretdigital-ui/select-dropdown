var SelectDropdown = (function () {

  var Multiselect = function (params) {
    this.$element = params.$element;
    this.$toggle = this.$element.find('.multiselect__toggle');
    this.$control = this.$element.find('.multiselect__control');
    this.$body = this.$element.find('.multiselect__dropdown');
    this.$container = params.$container;
    this.getText = params.getText;

    /* add multiselect class so that other methods can rely on it's presence */
    this.$element.addClass('multiselect');

    /* attach reference to object for event handlers to be able to access */
    this.$element.data('multiselect', this);

    var multiselect = this;

    /* bind events */
    $(document).on('ready', function () {

      /* wire up toggle */
      multiselect.$toggle.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // avoid native select dropdown
        $(this).find('select').blur();

        // open lmultiselect dropdown
        multiselect.toggle();
      });

      /* click outside to close */
      $(document).on('click.multiselect touchstart.multiselect', function (event) {
        var inMultiselect = $(event.target).closest('.multiselect').length > 0;
        if (!inMultiselect) {
          $('.multiselect').each(function (index, multiselect) { $(multiselect).data('multiselect').close(); });
        }
      });

    });
  };

  Multiselect.prototype = {

    isMobile: function () {
      return $(window).width() < 768;
    },

    isOpen: function () {
      return this.$element.hasClass('multiselect--open');
    },

    open: function () {
      // close all other multiselects
      $('.multiselect--open').not(this.$element).each(function (index, multiselect) { $(multiselect).data('multiselect').close(); });
      this.$element.addClass('multiselect--open');
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
      this.$element.removeClass('multiselect--open');

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
    }
  };

  return Multiselect;

})();
