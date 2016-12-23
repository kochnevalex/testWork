(function ($) {
  
  $.fn.rippleEffect = function () {
    $(this).each(function () {
      var button = $(this);

      var Delay = false;
      button.click(function (Event) {
        if (Delay == false) {
          Delay = true;

          var $This = $(this);

          var Spot = {
            Xpos: Event.pageX - $This.offset().left,
            Ypos: Event.pageY - $This.offset().top
          };

          var splash = $('<span class="ripple">');
          splash.appendTo($This).css({
            'top': Spot.Ypos - (splash.height() / 2),
            'left': Spot.Xpos - (splash.width() / 2)
          });

          setTimeout(function () {
            splash.remove();
          }, 1000);

          setTimeout(function () {
            Delay = false;
          }, 200);
        }
      });
    });
  };
  $.fn.underlineEffect = function () {

    $(document).on('mouseover', '.js__underline-effect', function (Event) {
      var splash = $('<span class="splash">');

      if (!$('.splash', this).length) {
        splash.appendTo($(this));
      }

      splash.css({
        'left': Event.pageX - $(Event.currentTarget).offset().left,
        'right': $(Event.currentTarget).offset().left + $(Event.currentTarget).outerWidth() - Event.pageX
      });

      setTimeout(function () {
        splash.addClass('animate');
      }, 20);
    });

    $(document).on('mouseleave', '.js__underline-effect', function (Event) {
      var splash = $('.splash', this);
      splash.css({
        'left': Event.pageX - $(Event.currentTarget).offset().left,
        'right': $(Event.currentTarget).offset().left + $(Event.currentTarget).outerWidth() - Event.pageX
      });
      splash.removeClass('animate');
      setTimeout(function () {
        splash.remove();
      }, 200);

    });
  };

})(jQuery);

