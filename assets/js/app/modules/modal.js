"use strict";
appMakeBeCool.gateway.addClass('Modal', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _modal = this,
      _d = {
        overlay: '#overlay',
        modal: '.modal',
        modalClose: '.modal__close'
        // elements
        // prop
        // data
        // classes ans styles
      },
      _p = $.extend(_d, properties),
      _g = {
        // elements
        overlay: null,
        modal: null,
        modalClose: null,
        // prop
        preloaded: false
      },

      _init = function () {
        appMakeBeCool.gateway.base.Class.apply(_modal, [_p]);
        if (!_g.preloaded) {
          return _modal.init();
        }
        _modal.globals.customCreate = function () {
          _config();
          _setCustomMethods();
          _setup();
          _setBinds();

        };
        _modal.create();
      },

      _config = function () {
        _g.overlay = $(_p.overlay);
        _g.modal = $(_p.modal);
        _g.modalClose = $(_p.modalClose);
      },

      _setup = function () {
      },

      _setBinds = function () {
        _binds().closeModalBind();
      },

      _binds = function () {
        return {
          closeModalBind: function () {
            _modal.bind(_g.modalClose, 'click', function (e, data, el) {
              e.preventDefault();
              var $modal = $(e.target).closest(_p.modal);
              _modal.globals.modalClose($modal);
            });
          }
        };
      },

      _triggers = function () {
        return {};
      },

      _setCustomMethods = function () {
        _modal.globals.customResurrect = function () {
        };
        _modal.globals.customDestroy = function () {
        };
        _modal.globals.modalClose = function ($modal) {
          $modal.removeClass('active');
          _g.overlay.removeClass('active');
        };
      };

  _modal.addMethod('init', function () {
    _modal.bind($window, _modal.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});