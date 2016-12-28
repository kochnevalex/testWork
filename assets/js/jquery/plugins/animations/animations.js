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
      var button = $(this), Delay = false;

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


  $.fn.toolTip = function (settingsCustom) {
    var This = $(this);
    var splash = This.find('.tooltip');
    var settings = {
      offsetXpercentage: 50,
      offsetYpercentage: 200

    };

    var settingsNew = settingsCustom;

    $.extend(true, settings, settingsNew);

    $(this).on('mousemove', This, function (Event) {
      splash.show();
      var posX = Event.pageX;//Положение курсора по x относительно экрана
      var posY = Event.pageY;//Положение курсора по y относительно экрана
      var curTarget = $(Event.currentTarget);
      var parentWidth = curTarget.outerWidth();
      var childWidth = splash.outerWidth();
      var childHeight = splash.outerHeight();

      var parentX = curTarget.offset().left;
      var offset = childWidth/ (100/settings.offsetXpercentage);
      var offsetTop = childHeight/(100/settings.offsetYpercentage);


      var parentXWithWidth = parentX + parentWidth;

      console.log(parentX);
      console.log(posX - offset);
      //если этот отступ меньше


      if ((posX - offset) <= parentX) {
        //прилипание к левой границе
        splash.css({
          'left': '0',
          'right': 'auto',
          'top': -(curTarget.offset().top + curTarget.outerHeight() - posY) + offsetTop
        });

      } else if (posX >= (parentXWithWidth - (childWidth - offset))) {

        //прилипание к правой границе
        splash.css({
          'left': 'auto',
          'right': '0',
          'top': -(curTarget.offset().top + curTarget.outerHeight() - posY) + offsetTop
        });

      }else{
        splash.css({
          'left': posX - curTarget.offset().left - offset,
          'right': 'auto',
          'top': -(curTarget.offset().top + curTarget.outerHeight() - posY) + offsetTop

        });
      }


    });

    $(this).on('mouseleave', This, function () {


      splash.hide();

    });

  };

})(jQuery);


