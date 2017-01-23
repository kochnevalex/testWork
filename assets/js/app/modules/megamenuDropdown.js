"use strict";
appMakeBeCool.gateway.addClass('MegamenuDropdown', function (properties, $, $window, $document) {
  var _megamenuOpening = this,
    _d = {
      openSubcategory: '.megamenu__has-sub',
      openMegamenu: '.megamenu__title',
      megamenuDropdown: '.megamenu__dropdown',
      winHeight: 0


    },
    _p = $.extend(_d, properties),
    _g = {
      openSubcategory: null,
      openMegamenu: null,
      megamenuDropdown: null,
      winHeight: null,
      preloaded: false
    },


    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_megamenuOpening, [_p]);
      if (!_g.preloaded) {
        return _megamenuOpening.init();
      }
      _megamenuOpening.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();


      };
      _megamenuOpening.create();
    },

    _config = function () {
      _g.openSubcategory = $(_p.openSubcategory);
      _g.openMegamenu = $(_p.openMegamenu);
      _g.megamenuDropdown = $(_p.megamenuDropdown);
      _g.winHeight = $window.outerHeight();

    },

    _setup = function () {
      _g.openMegamenu.on('click',function () {
        var This = $(this);
        This.toggleClass('opened').next().slideToggle();
      });

      _g.openSubcategory.each(function(){
        var This = $(this);
        var ThisClos = This.closest('.megamenu__category');
        var ThisClosSibl = ThisClos.siblings();
        This.on('click',function () {

          if($window.width() < 992){

            if(!ThisClos.hasClass('mod--actual')){
              ThisClos.addClass('mod--actual');
              ThisClosSibl.removeClass('mod--actual');
              // This.next().removeClass('mod--display-none').addClass('mod--actual');

            }
          }
        });
        This.on('resize',function(){
          if($window.width() >= 992 && This.hasClass('opened')){
            Theese.toggleClass('opened').next().slideToggle();

          }
        })
      });




    },

    _setBinds = function () {
      _binds().setClickBind();
      _binds().setResizeBind();

    },

    _binds = function () {
      return {
        setClickBind: function () {
          _megamenuOpening.bind(_g.openSubcategory, 'click', function (event, data, el) {

            _megamenuOpening.globals.dropMegamenu(event);

          });
        },
        setResizeBind: function () {
          _megamenuOpening.bind($window, 'resize', function (event, data, el) {

            _megamenuOpening.globals.dropMegamenu(event);

          });
        }



      };
    },

    _triggers = function () {
      return {

      };
    },

    _setCustomMethods = function () {
      _megamenuOpening.globals.customResurrect = function () {
      };
      _megamenuOpening.globals.customDestroy = function () {
      };
      _megamenuOpening.globals.dropMegamenuDisable = function (event) {

      };
      _megamenuOpening.globals.dropMegamenu = function (event) {


      }
    };

  _megamenuOpening.addMethod('init', function () {
    _megamenuOpening.bind($window, _megamenuOpening.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});
