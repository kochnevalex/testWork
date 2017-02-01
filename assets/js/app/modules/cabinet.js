"use strict";
appMakeBeCool.gateway.addClass('Cabinet', function (properties, $, $window, $document) {
  var _cabinet = this,
    _d = {
      $li: '.tabs.dropdown li',
      $tabs: '.tabs__container-box',
      $tabsCurrent: '.dd__tabs-current',
      $dropdown: '.tabs.dropdown',
      window: $window
    },
    _p = $.extend(_d, properties),
    _g = {
      $li: null,
      $tabs: null,
      $tabsCurrent: null,
      $dropdown: null,
      window: null
    },


    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_cabinet, [_p]);
      if (!_g.preloaded) {
        return _cabinet.init();
      }
      _cabinet.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();


      };
      _cabinet.create();
    },

    _config = function () {
        _g.$li = $(_p.$li);
        _g.$tabs = $(_p.$tabs);
        _g.$tabsCurrent = $(_p.$tabsCurrent);
        _g.$dropdown = $(_p.$dropdown);
        _g.window = $window
    },

    _setup = function () {
      $("#datepicker-accaunt").datepicker();

      $('.address .show-more').on('click', function () {
        $('.address .form-address').slideToggle(500);
        var parent = $(this).parent();
        parent.hide();
        return false;
      });

      $('.address .form-address .button').on('click', function () {
        $('.address .form-address').slideToggle(500);
        $('.address .show-wrap--border').show();

      });
      $('.form-close').on('click', function () {
        var theese = $(this);
        var form = theese.closest('.subscribe');
        form.slideToggle(500);
        var parentAccaunt = theese.closest('.accaunt-bra-fitting-table');
        var parentAddress = theese.closest('.address');
        parentAccaunt.find('.show-wrap--border').show();
        parentAddress.find('.show-wrap--border').show();
      });
      $('.accaunt-slide-toggle').on('click', function (e) {
        var parent = $(e.target).closest('.accaunt-slide-toggle');
        parent.next().slideToggle(500);
        parent.closest('.accaunt-slide').toggleClass('active');
      });
    },

    _setBinds = function () {
      _binds().setClickBind();

    },

    _binds = function () {
      return {
        setClickBind: function () {


          _g.$li.on('click', function (e) {
            var $currentLi = $(e.target).closest('.tabs.dropdown li'),
              index = $currentLi.index();
            _g.$li.removeClass('active');
            $currentLi.addClass('active');
            _g.$tabs.removeClass('active');
            _g.$tabs.eq(index).addClass('active');
            if (_g.window.width() < 993) {
              _g.$dropdown.slideToggle(500);
            }
            return false;
          });


          _g.$tabsCurrent.on('click', function (e) {
            var theese = $(this);
            theese.parent().toggleClass('active');
            theese.next().slideToggle(500);
          });

          $('.dd__tabs .dropdown li a').on('click', function (e) {

            $('.dd__tabs').toggleClass('active');
            _g.$tabsCurrent.html($(this).html());
          });

        }


      };
    },

    _triggers = function () {
      return {

      };
    },

    _setCustomMethods = function () {
      _cabinet.globals.customResurrect = function () {
      };
      _cabinet.globals.customDestroy = function () {
      };


    };

  _cabinet.addMethod('init', function () {
    _cabinet.bind($window, _cabinet.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});
