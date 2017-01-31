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

      var acc = $(".b-cart__accordion");
      for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("show");
        }
      }

      $('fieldset input').on('click', function (e) {
        $(e.target).parent().find('label').addClass('active');
      });
      $('fieldset input').on('blur', function (e) {
        if($(e.target).val().length === 0) {
          $(e.target).parent().find('label').removeClass('active');
        }
      });

      $('fieldset textarea').on('click', function (e) {
        $(e.target).parent().find('label').addClass('active');
      });

      $('fieldset textarea').on('blur', function (e) {
        if($(e.target).val().length === 0) {
          $(e.target).parent().find('label').removeClass('active');
        }
      });

      $('.b-cart__accordion-comment').click(function () {
        $('.b-cart__panel-comment').toggleClass('show','show');
      });

      /*-----------------Функция появления картинки при выборе банка-----------------*/

      $('.b-cart__panel-pay input[type=radio]').on('click', function (e) {
        $('.panel-pay-item').each(function () {
          if ($('.b-cart__panel-pay input[type=radio]').not(':checked')) {
            $('.b-cart__pay-screen').removeClass('active');
          }
        });
        e.currentTarget.nextElementSibling.nextElementSibling.className += ' active';
      });

      /*-----------------Функция открытия правил-----------------*/

      $('.b-cart__checkout-link').on('click', function () {
        if ($(window).width() > 1200) {
          $('.b-cart__l-body').fadeOut();
          var ttWidthGreen = $('.b-cart__r-colum').height() + 500;
          $('.b-cart__l-colum').height(ttWidthGreen);
        }
        $('.b-cart__agreement').fadeIn();
        if($('.b-cart__agreement').css('display') == 'block') {
          $('.b-cart__panel-checkout').css({
            'margin-top': '575px'
          });
        }
      });
      $('.close-btn').on('click', function () {
        $('.b-cart__l-body').fadeIn();
        $('.b-cart__agreement').fadeOut();
        $('.b-cart__l-colum').css({
          'height' : 'inherit'
        });
        setTimeout(function () {
          $('.b-cart__panel-checkout').css({'margin-top' : '60px'});
        }, 300);
      });

      $('.b-cart__checkout-btn').on('click', function () {
        $('.cart-success').fadeIn();
        $('.cart-body').fadeOut();
      });

      $('.subscribe__cat').select2({
        minimumResultsForSearch: Infinity
      });

      $('.payment-panel-list').select2({
        minimumResultsForSearch: Infinity
      });

      /*-----------------Конец-----------------*/

      /*-----------------Функция добавления адреса-----------------*/

      $('.payment-panel-menu').select2({
        minimumResultsForSearch: Infinity,
        containerCssClass: "payment-select2",
        dropdownCssClass: "payment-select2__dropdown"
      });

      $('.payment-panel-menu').on('select2:select', function (evt) {
        var $select = $(evt.target);
        var optionsAddressValue = $select.find("option:last-child").val();
        console.log(optionsAddressValue);
        var paramId = evt.params.data.id;
        console.log(paramId);
        if (optionsAddressValue === paramId) {
          $('.b-cart__panel-form-new').fadeIn();
          $('.b-cart__panel-form-list').fadeOut();
        }

        $('.btn-cancel-link').click(function (i) {
          $('.b-cart__panel-form-new').fadeOut();
          $('.b-cart__panel-form-list').fadeIn();
          $('.payment-panel-menu').val($('.payment-panel-menu option:first-child').val()).trigger('change');
        });

        $('.b-cart__add-adress').on('click', function () {
          if ($('.b-cart__panel-form-new').find('input').val() != '') {
            addAddress();
          }
          $('.b-cart__panel-form-new').fadeOut();
          $('.b-cart__panel-form-list').fadeIn();
          resetAddress();
        });

        function addAddress() {
          var valCity = $('.b-cart__city').val();
          var valStreeet = $('.b-cart__street').val();
          var valHome = $('.b-cart__home').val();
          var valKv = $('.b-cart__kv').val();
          var selectOptionHtml = valCity + ', ' + valStreeet + ', ' + valHome + ', ' + valKv;
          $(".payment-panel-menu option:nth-child(1)").after($('<option>', {text: selectOptionHtml}));
          $('.payment-panel-menu').val($('.payment-panel-menu option:first-child').val()).trigger('change');
        };

        function resetAddress() {
          $('.b-cart__panel-form-new').find('input').val('');
        };

      });


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
