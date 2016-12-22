appMakeBeCool.gateway.addClass('Masonry', function (properties, $, $window, $document) {
  //PRIVATE VARIABLESc
  var _masonry = this,
      _d = {
        // elements
        masonry: '.masonry',
        masonryItem: '.masonry__item',
        // classes ans styles
      },
      _p = $.extend(_d, properties),
      _g = {
        // elements
        masonry: null,
        masonryItem: null,
        // prop
        action: 'init',
        preloaded: false
      },

  //PRIVATE METHODS
      _init = function () {
        appMakeBeCool.gateway.base.Class.apply(_masonry, [_p]);
        if (!_g.preloaded) {
          return _masonry.init();
        }
        _masonry.globals.customCreate = function () {
          _config();
          _setup();
          _setBinds();
          _setCustomMethods();
        };
        _masonry.create();
      },

      _config = function () {
        _g.masonry = $(_p.masonry);
        _g.masonryItem = $(_p.masonryItem);
      },

      _setup = function () {
      },

      _setBinds = function () {
        _binds().masonryInit();
        _binds().setSrollBind();
        _binds().setAddElementsBind();
      },

      _binds = function () {
        return {
          masonryInit: function () {
            _masonryInit();

          },
          setSrollBind: function () {
            _masonry.bind($window, 'scroll', function () {

            });

          },
          setAddElementsBind: function () {
            _masonry.bind($window, _masonry.globals.classType + '_AddElements', function (e, data, el) {
              _addElements(data.elements);
            });
          },
        }
      },
      _addElements = function (elements) {
        elements.imagesLoaded(function () {
          _g.masonry.append(elements).masonry('appended', elements);
        });

      },
      _triggers = function () {
        return {}
      },
      _masonryInit = function () {
        if (_g.masonry.length) {
          _g.masonry.imagesLoaded(function () {
            _g.masonry.masonry({
              itemSelector: _p.masonryItem,
              columnWidth: '.grid-sizer',
              isResizable: true,
              gutter: 30,
              percentPosition: true,
              animationOptions: {
                duration: 250,
                easing: "swing"
              },
              isAnimatedFromBottom: true
            });
          });

        }
      },
      _masonryUpdate = function () {
        _g.masonry.masonry('reloadItems');
      },

      _setCustomMethods = function () {
        _masonry.globals.customResurrect = function () {
        }
        _masonry.globals.customDestroy = function () {
        }
      }

  //PUBLIC METHODS
  _masonry.addMethod('init', function () {
    _masonry.bind($window, _masonry.globals.classType + '_Init', function (e, data, el) {
      if (data.action == 'update') {
        _g.action = 'update';
      }
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});

