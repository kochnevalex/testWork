"use strict";
appMakeBeCool.gateway.addClass('SelectAndTelInit', function (properties, $, $window, $document) {
  var _selectAndTel = this,
    _d = {


    },
    _p = $.extend(_d, properties),
    _g = {

      preloaded: false
    },


    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_selectAndTel, [_p]);
      if (!_g.preloaded) {
        return _selectAndTel.init();
      }
      _selectAndTel.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();


      };
      _selectAndTel.create();
    },

    _config = function () {
      _g.dropDownBtn = $(_p.dropDownBtn);

    },

    _setup = function () {


      $('.subscribe__cat').select2({
        minimumResultsForSearch: Infinity
      });

      $('.payment-panel-list').select2({
        minimumResultsForSearch: Infinity
      });

      $('.payment-panel-menu').select2({
        minimumResultsForSearch: Infinity,
        containerCssClass: "payment-select2",
        dropdownCssClass: "payment-select2__basketScripts"
      });
      $("#tel").intlTelInput({
        autoHideDialCode: false,
        separateDialCode: true,
        onlyCountries: ['ua', 'ru', 'am', 'az', 'kz', 'kg']
      });

    },

    _setBinds = function () {


    },

    _binds = function () {
      return {



      };
    },

    _triggers = function () {
      return {

      };
    },

    _setCustomMethods = function () {
      _selectAndTel.globals.customResurrect = function () {
      };
      _selectAndTel.globals.customDestroy = function () {
      };


    };

  _selectAndTel.addMethod('init', function () {
    _selectAndTel.bind($window, _selectAndTel.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});
