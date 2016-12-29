"use strict";
appMakeBeCool.gateway.addClass('SvgAnimations', function (properties, $, $window, $document) {
  var _svgAnimations = this,
    _d = {

    },
    _p = $.extend(_d, properties),
    _g = {

      preloaded: false
    },

    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_svgAnimations, [_p]);
      if (!_g.preloaded) {
        return _svgAnimations.init();
      }
      _svgAnimations.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();

      };
      _svgAnimations.create();
    },

    _config = function () {

    },

    _setup = function () {
      _svgAnimations.globals.setDimentionsFirstSlideSvg();
      _svgAnimations.globals.initSvgnimation(_g.mainIntro);
    },

    _setBinds = function () {
      _binds().setResizeBind();
      _binds().setScrollBind();
    },

    _binds = function () {
      return {
        setResizeBind: function () {
          _svgAnimations.bind($window, 'resize', function (e, data, el) {

          });
        },
        setScrollBind: function () {
          _svgAnimations.bind($window, 'scroll', function (e, data, el) {

          });
        },
      };
    },

    _triggers = function () {
      return {};
    },

    _setCustomMethods = function () {
      _svgAnimations.globals.customResurrect = function () {
      };
      _svgAnimations.globals.customDestroy = function () {
      };


      _svgAnimations.globals.initSvgnimation = function ($parent) {
        var $svgContainer = $parent.find('.svg-figures');
        var $svgs = $parent.find('svg');
        var $pathes = $svgs.find('path');

        if ($svgs.length && _g.winWidth >= 768) {
          $svgContainer.addClass('active');
          $svgs.each(function () {
            var $svg = $(this);
            var path = $svg.find('path')[0];
            var pathLength = path.getTotalLength();

            path.style.strokeDasharray = pathLength + ' ' + pathLength;
            path.style.strokeDashoffset = pathLength;
          });
          $svgs[0].getBoundingClientRect();
          for (var i = 0; i < $pathes.length; i++) {
            $pathes[i].style.strokeDashoffset = '0';
          }
        }
      };

    };

  _svgAnimations.addMethod('init', function () {
    _svgAnimations.bind($window, _svgAnimations.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});