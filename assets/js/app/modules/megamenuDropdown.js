"use strict";
appMakeBeCool.gateway.addClass('MegamenuDropdown', function (properties, $, $window, $document) {
  var _megamenuOpening = this,
    _d = {
      megamenu: '#megamenu',
      openSubcategory: '.megamenu__has-sub > a',
      openMegamenu: '.megamenu__title',
      megamenuDropdown: '.megamenu__dropdown',
      winHeight: 0


    },
    _p = $.extend(_d, properties),
    _g = {
      megamenu: null,
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
      _g.megamenu = $(_p.megamenu);
      _g.openSubcategory = $(_p.openSubcategory);
      _g.openMegamenu = $(_p.openMegamenu);
      _g.megamenuDropdown = $(_p.megamenuDropdown);
      _g.winHeight = $window.outerHeight();

    },

    _setup = function () {
      _g.megamenu.removeClass('mod--closed');

      var minHight = function (parentHeight, openHeight) {

        if (openHeight < parentHeight) {

          return parentHeight;

        } else if (openHeight >= parentHeight) {
          return openHeight
        }


      };
      _g.openMegamenu.on('click', function () {

        var This = $(this);
        var ThisNext = This.next();

        if (This.attr('data-state') == 'closed') {

          This.addClass('opened');
          var ThisNextHeight = $('.megamenu__categories').outerHeight();
          console.log(ThisNextHeight);
          // var ThisNextDropdown = ThisNext.find('.mod--actual .megamenu__dropdown-wrap').outerHeight();

          ThisNext.addClass('opened');
          ThisNext.css('height', 'auto');
          This.attr('data-state', 'opened');

        } else if (This.attr('data-state') == ('opened')) {
          ThisNext.removeClass('opened');
          ThisNext.css({height: '0'});
          // This.removeClass('opened');
          This.attr('data-state', 'closed');

        }

      });


      _g.openSubcategory.on('click', function () {


        if ($window.width() < 992) {

          var This = $(this),
            // $parental = This.closest('.megamenu__category'),
            ThisClos = This.closest('.megamenu__category'),
            ThisClosSibl = ThisClos.siblings(),
            // parentalHeight = $parental.outerHeight(),
            ThisNext = ThisClos.find('.megamenu__dropdown-wrap');
          // ThisNextHeight = ThisNext.outerHeight();
          console.log($(this));

          if (!ThisClos.hasClass('mod--actual')) {
            ThisClos.addClass('mod--actual');
            ThisClosSibl.removeClass('mod--actual');


          }
          ThisNext.slideToggle(500);
          // ThisNext.closest('.megamenu').css({height: minHight(parentalHeight, ThisNextHeight)});

        }


      });
      $('.megamenu__sub-category').on('click', function () {
        $(this).find('.megamenu__img').toggleClass('active');
      });

      $window.on('resize', function () {
        if ($window.width() <= 992) {
          // This.closest('.megamenu').css({height : minHight(parentalHeight,ThisNextHeight)});
        }
      })


    },

    _setBinds = function () {
      _binds().setClickBind();
      _binds().setResizeBind();

    },

    _binds = function () {
      return {
        setClickBind: function () {

        },
        setResizeBind: function () {

        }


      };
    },

    _triggers = function () {
      return {};
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
