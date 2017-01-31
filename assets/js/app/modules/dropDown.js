"use strict";
appMakeBeCool.gateway.addClass('DropDown', function (properties, $, $window, $document) {
  var _dropDown = this,
    _d = {
      dropDownBtn: ''

    },
    _p = $.extend(_d, properties),
    _g = {
      dropDownBtn: null,
      preloaded: false
    },


    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_dropDown, [_p]);
      if (!_g.preloaded) {
        return _dropDown.init();
      }
      _dropDown.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();


      };
      _dropDown.create();
    },

    _config = function () {
      _g.dropDownBtn = $(_p.dropDownBtn);

    },

    _setup = function () {


    },

    _setBinds = function () {
      _binds().setClickBind();
      _binds().setResizeBind();

    },

    _binds = function () {
      return {
        setClickBind: function () {

          //filters block
          $('.b-filters .form-group__filter-ttl').on('click', function () {
            $(this).parent().toggleClass('active');
            $(this).next().slideToggle(500);
          });

          $('#filterBtn').on('click', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
            $(this).next().slideToggle(500);
          });

          $('.show-all-filters a').on('click', function (e) {
            e.preventDefault();
            $(this).hide().parent().prev().addClass('show-all-el')
          });

          $('#getSorted').on('click', function (e) {
            e.preventDefault();
            var thees = $(this);
            thees.parent().toggleClass('active');
            thees.next().slideToggle(500);
          });



        },
        setResizeBind: function () {

        }



      };
    },

    _triggers = function () {
      return {

      };
    },

    _setCustomMethods = function () {
      _dropDown.globals.customResurrect = function () {
      };
      _dropDown.globals.customDestroy = function () {
      };

      _dropDown.globals.dropDown = function (event) {


      }
    };

  _dropDown.addMethod('init', function () {
    _dropDown.bind($window, _dropDown.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});
