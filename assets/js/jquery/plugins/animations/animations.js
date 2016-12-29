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
    $(this).each(function () {
      var This = $(this),
        toolTip = This.find('.tooltip'),
        childWidth = toolTip.outerWidth(),
        settings = {
          offsetXpercentage: 0,
          offsetYpx: 100,
          adaptiveWidth: false

        },
        settingsNew = settingsCustom;

      $.extend(true, settings, settingsNew);

      if (settings.adaptiveWidth) {
        toolTip.css({
          'width': settings.adaptiveWidth
        });
      } else {
        toolTip.css({
          'min-width': childWidth,
          'width': childWidth
        });
      }
      $(toolTip).on('mouseover', function (Event) {

      });
      $(this).on('mousemove', function (Event) {
        toolTip.show();
        var posX = Event.pageX;//Положение курсора по x относительно экрана
        var posY = Event.pageY;//Положение курсора по y относительно экрана
        var curTarget = $(Event.currentTarget);
        var parentWidth = curTarget.outerWidth();
        var childHeight = toolTip.outerHeight();
        var childCurWidth = toolTip.outerWidth();

        var parentX = curTarget.offset().left;
        var offset = childCurWidth / (100 / settings.offsetXpercentage);
        var offsetTop = -(settings.offsetYpx + childHeight / 2);
        var windowWidth = $(window).width();

        var parentXWithWidth = parentX + parentWidth;


        if ((posX - offset) <= 0) {
          //прилипание к левой границе
          var stopLeft = (-parentX);
          toolTip.css({
            'left': stopLeft,
            'right': 'auto'
          });

        } else if (posX >= windowWidth - (childCurWidth - offset)) {

          //прилипание к правой границе
          var stopRight = parentXWithWidth - windowWidth;
          toolTip.css({
            'left': 'auto',
            'right': stopRight

          });


        } else {
          toolTip.css({
            'left': posX - curTarget.offset().left - offset,
            'right': 'auto'
          });
        }

        toolTip.css({

          'top': posY - curTarget.offset().top - offsetTop,
          'max-width': windowWidth

        });


      });
      $(this).on('mouseleave', function () {


        toolTip.hide();

      });

    });


  };

})(jQuery);


