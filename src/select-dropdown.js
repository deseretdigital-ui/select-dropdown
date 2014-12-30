var SelectDropdown = (function () {

  var Multiselect = function ($multiselect, $container) {
    this.$multiselect = $multiselect;
    this.$toggle = $multiselect.find('.multiselect__toggle');
    this.$control = $multiselect.find('.multiselect__control');
    this.$body = $multiselect.find('.multiselect__dropdown');
    this.$container = $container;

    /* add multiselect class so that other methods can rely on it's presence */
    this.$multiselect.addClass('multiselect');

    /* attach reference to object for event handlers to be able to access */
    this.$multiselect.data('multiselect', this);

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
      return this.$multiselect.hasClass('multiselect--open');
    },

    open: function () {
      // close all other multiselects
      $('.multiselect--open').not(this.$multiselect).each(function (index, multiselect) { $(multiselect).data('multiselect').close(); });
      this.$multiselect.addClass('multiselect--open');
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
      this.$multiselect.removeClass('multiselect--open');

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
      var targetOffset = Math.floor(this.$multiselect.eq(0).offset().top);
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
