"use strict";
appMakeBeCool.gateway.addClass('Header', function (properties, $, $window, $document) {
  var _header = this,
      _d = {
        header: '#header',
        menuToggle: '#menuToggle',
        nav: '#nav'
      },
      _p = $.extend(_d, properties),
      _g = {
        header: null,
        menuToggle: null,
        nav: null,
        preloaded: false
      },

      _init = function () {
        appMakeBeCool.gateway.base.Class.apply(_header, [_p]);
        if (!_g.preloaded) {
          return _header.init();
        }
        _header.globals.customCreate = function () {
          _config();
          _setCustomMethods();
          _setup();
          _setBinds();
        };
        _header.create();
      },

      _config = function () {
        _g.header = $(_p.header);
        _g.menuToggle = $(_p.menuToggle);
        _g.nav = $(_p.nav);
      },

      _setup = function () {
      },

      _setBinds = function () {
        _binds().setMenuToggle();
      },

      _binds = function () {
        return {
          setMenuToggle: function () {
            _header.bind(_g.menuToggle, 'click', function (e, data, el) {
              _header.globals.menuToggle();
            });
          }
        };
      },

      _triggers = function () {
        return {};
      },

      _setCustomMethods = function () {
        _header.globals.customResurrect = function () {
        };
        _header.globals.customDestroy = function () {
        };
        _header.globals.menuToggle = function () {
          _g.menuToggle.toggleClass('active');
          _g.nav.toggleClass('active');
        };
      };

  _header.addMethod('init', function () {
    _header.bind($window, _header.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});