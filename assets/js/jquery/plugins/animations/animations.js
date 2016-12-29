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
    var toolTip = This.find('.tooltip');
    var settings = {
      offsetXpercentage: 50,
      offsetYpercentage: 100,
      maxWidth: null

    };

    var settingsNew = settingsCustom;

    $.extend(true, settings, settingsNew);

    var childWidth = toolTip.outerWidth();

    $(this).on('mousemove', This, function (Event) {
      toolTip.show();
      var posX = Event.pageX;//Положение курсора по x относительно экрана
      var posY = Event.pageY;//Положение курсора по y относительно экрана
      var curTarget = $(Event.currentTarget);
      var parentWidth = curTarget.outerWidth();
      var parentHeight = curTarget.outerHeight();

      var childHeight = toolTip.outerHeight();
      var childCurWidth = toolTip.outerWidth();

      var parentX = curTarget.offset().left;
      var offset = childWidth/ (100/settings.offsetXpercentage);
      var offsetTop = childHeight + childHeight/(100/settings.offsetYpercentage);
      var windowWidth = $(window).width();

      var parentXWithWidth = parentX + parentWidth;
      if(settings.maxWidth != null){
        toolTip.css({
          'width': '100%',
          'max-width': settings.maxWidth
        });
      }else{
        toolTip.css({
          'width': 'auto'
        });
      }





      if ((posX - offset) <= 0) {
        //прилипание к левой границе
        var stopLeft = (-parentX);
        toolTip.css({
          'left': stopLeft,
          'right': 'auto',
          'top': -(curTarget.offset().top + parentHeight - posY) + offsetTop
        });

      } else if (posX >= windowWidth  - (childCurWidth - offset)) {


        //прилипание к правой границе
        var stopRight = parentXWithWidth - windowWidth;
        toolTip.css({
          'left': 'auto',
          'right': stopRight,
          'top': -(curTarget.offset().top + parentHeight - posY) + offsetTop

        });
        console.log(childCurWidth );

      }else{
        toolTip.css({
          'left': posX - curTarget.offset().left - offset,
          'right': 'auto',
          'top': -(curTarget.offset().top + parentHeight - posY) + offsetTop

        });
      }




    });

    $(this).on('mouseleave', This, function () {


      toolTip.hide();

    });

  };

})(jQuery);


