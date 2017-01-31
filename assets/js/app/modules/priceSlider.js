"use strict";
appMakeBeCool.gateway.addClass('PriceSlider', function (properties, $, $window, $document) {
  var _priceSlider = this,
    _d = {
      dropDownBtn: ''



    },
    _p = $.extend(_d, properties),
    _g = {
      dropDownBtn: null,
      preloaded: false
    },


    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_priceSlider, [_p]);
      if (!_g.preloaded) {
        return _priceSlider.init();
      }
      _priceSlider.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();


      };
      _priceSlider.create();
    },

    _config = function () {
      _g.dropDownBtn = $(_p.dropDownBtn);

    },

    _setup = function () {
      var minn = Number($("#slider-range").attr('data-min'));
      var maxx = Number($("#slider-range").attr('data-max'));
      $("#slider-range").slider({
        range: true,
        min: minn,
        max: maxx,
        values: [75, 300],

        slide: function (event, ui) {
          $("#amountMin").val(ui.values[0]);
          $("#amountMax").val(ui.values[1]);
        }
      });


      $("#amountMin").val($("#slider-range").slider("values", 0));
      $("#amountMax").val($("#slider-range").slider("values", 1));


      $('#amountMin').change(function () {
        if ($(this).val() > $("#slider-range").slider('values', 1)) {
          $(this).val($("#slider-range").slider('values', 1));
        }
        $("#slider-range").slider('values', 0, $(this).val());
      });


      $('#amountMax').change(function () {
        if ($(this).val() < $("#slider-range").slider('values', 0)) {
          $(this).val($("#slider-range").slider('values', 0));
        }
        $("#slider-range").slider('values', 1, $(this).val());
      });

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
      return {

      };
    },

    _setCustomMethods = function () {
      _priceSlider.globals.customResurrect = function () {
      };
      _priceSlider.globals.customDestroy = function () {
      };

      _priceSlider.globals.dropDown = function (event) {


      }
    };

  _priceSlider.addMethod('init', function () {
    _priceSlider.bind($window, _priceSlider.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});
var priceSlider = function () {
  var _g = {},
    _init = function () {
      _setup();
      _binds().setClickBind();
    },
    _setup = function () {

    },
    _binds = function () {
      return {
        setClickBind: function () {

        }
      }
    };
  _init();
};
