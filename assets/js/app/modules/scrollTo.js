appMakeBeCool.gateway.addClass('ScrollTo', function (properties, $, $window, $document) {
  var _scrollTo = this,
    _d = {
      scrollBtn: '.scroll-btn'
    },
    _p = $.extend(_d, properties),
    _g = {
      scrollBtn: null,
      preloaded: false
    },

  //PRIVATE METHODS
    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_scrollTo, [_p]);
      if (!_g.preloaded) {
        return _scrollTo.init();
      }
      _scrollTo.globals.customCreate = function () {
        _config();
        _setup();
        _setBinds();
        _setCustomMethods();
      };
      _scrollTo.create();
    },

    _config = function () {
      _g.scrollBtn = $(_p.scrollBtn);
    },

    _setup = function () {

    },

    _setBinds = function () {
      _binds().setClickBind();
    },

    _binds = function () {
      return {
        setClickBind: function () {
          _scrollTo.bind(_g.scrollBtn, 'click', function (e, data, el) {
              e.preventDefault();
              _clickScroll($(el));
            }
          );
        },
      }
    },
    _clickScroll = function ($node) {
      var id = $node.attr('href');
      if (id.length) {

        $('html, body').animate({
          'scrollTop': $(id).offset().top
        }, {
          step: function (now, fx) {

          },
          duration: 800,
          easing: 'easeInOutQuint',
          queue: false,
          start: function () {

          },
          complete: function () {
          }
        }, 'ease');
      }


    },

    _triggers = function () {
      return {}
    },

    _setCustomMethods = function () {
      _scrollTo.globals.customResurrect = function () {
      }
      _scrollTo.globals.customDestroy = function () {
      }
    }

  //PUBLIC METHODS
  _scrollTo.addMethod('init', function () {
    _scrollTo.bind($window, _scrollTo.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});
