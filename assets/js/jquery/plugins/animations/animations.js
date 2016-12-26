(function ($) {

  $.fn.rippleEffect = function (settingsCustom) {
    var settings = {
      duration: 800,
      delay: 150,
      color: '#fff',
      animationDuration: 1000
    };

    var settingsNew = settingsCustom;

    $.extend(true, settings, settingsNew);

    $(this).each(function () {
      var button = $(this),Delay = false;

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
            'left': Spot.Xpos - (splash.width() / 2),
            'background-color': settings.color,
            'animation-duration': (settings.animationDuration + 'ms')
          });

          setTimeout(function () {
            splash.remove();
          }, settings.duration);

          setTimeout(function () {
            Delay = false;
          }, settings.delay);
        }
      });
    });
  };
  $.fn.underlineEffect = function (settingsCustom) {
    var This = $(this);
    var settings = {
      thick: 2,
      bottomOffset: -4,
      color: '#2185D0'
    };

    var settingsNew = settingsCustom;

    $.extend(true, settings, settingsNew);


    $(this).on('mouseover', This, function (Event) {
      var splash = $('<span class="splash">');

      if (!$('.splash', this).length) {
        splash.appendTo($(this));
      }

      splash.css({
        'left': Event.pageX - $(Event.currentTarget).offset().left,
        'right': $(Event.currentTarget).offset().left + $(Event.currentTarget).outerWidth() - Event.pageX,
        'background-color': settings.color,
        'bottom': settings.bottomOffset,
        'height': settings.thick
      });

      setTimeout(function () {
        splash.addClass('animate');
      }, 20);
    });

    $(this).on('mouseleave', This, function (Event) {
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

