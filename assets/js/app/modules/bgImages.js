"use strict";
appMakeBeCool.gateway.addClass('BgImages', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _bgimages = this,
      _d = {
        // elements
        bgImages: '.bg-image',
        // prop
        // data
        // classes ans styles
      },
      _p = $.extend(_d, properties),
      _g = {
        // elements
        bgImages: null,
        // prop
        preloaded: false
      },

  //PRIVATE METHODS
      _init = function () {
        appMakeBeCool.gateway.base.Class.apply(_bgimages, [_p]);
        if (!_g.preloaded) {
          return _bgimages.init();
        }
        _bgimages.globals.customCreate = function () {
          _config();
          _setup();
          _setBinds();
          _setCustomMethods();
        }
        _bgimages.create();
      },

      _config = function () {
        _g.bgImages = $(_p.bgImages);
      },

      _setup = function () {

        //Set detection
        if (_g.bgImages.length) {
          _g.bgImages.each(function () {
            var $node = $(this);

            if ($node.hasClass('img-added')) {
              return false;
            }
            $node.addClass('img-added');
            var imgUrl = $node.data('bgimage');
            $node.css({
              backgroundImage: "url('" + imgUrl + "')"
            });
          });
        }
      },

      _setBinds = function () {

      },

      _binds = function () {
        return {}
      },

      _triggers = function () {
        return {}
      },

      _setCustomMethods = function () {
        _bgimages.globals.customResurrect = function () {
        }
        _bgimages.globals.customDestroy = function () {
        }
      }

  //PUBLIC METHODS
  _bgimages.addMethod('init', function () {
    _bgimages.bind($window, _bgimages.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});