"use strict";
appMakeBeCool.gateway.addClass('CartOrder', function (properties, $, $window, $document) {
  var _cartOrder = this,
    _d = {
      fieldsetInput : 'fieldset input',
      fieldsetTextarea : 'fieldset textarea',
      accordionComment : '.b-cart__accordion-comment'



    },
    _p = $.extend(_d, properties),
    _g = {
      fieldsetInput: null,
      fieldsetTextarea: null,
      accordionComment: null,
      preloaded: false
    },


    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_cartOrder, [_p]);
      if (!_g.preloaded) {
        return _cartOrder.init();
      }
      _cartOrder.globals.customCreate = function () {
        _config();
        _setCustomMethods();
        _setup();
        _setBinds();


      };
      _cartOrder.create();
    },

    _config = function () {
      _g.fieldsetInput = $(_p.fieldsetInput);
      _g.fieldsetTextarea = $(_p.fieldsetTextarea);
      _g.accordionComment = $(_p.accordionComment);

    },

    _setup = function () {

      var acc = $(".b-cart__accordion");
      for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("show");
        }
      }
      _g.fieldsetInput.each(function(){
        var theese = $(this);
        console.log(theese);
        if(theese.val().length){

          theese.next().addClass('active');
        }
      });

      _g.fieldsetInput.on('focus', function (e) {
        $(e.target).parent().find('label').addClass('active');
      });
      _g.fieldsetInput.on('blur', function (e) {
        if($(e.target).val().length === 0) {
          $(e.target).parent().find('label').removeClass('active');
        }
      });

      _g.fieldsetTextarea.on('click', function (e) {
        $(e.target).parent().find('label').addClass('active');
      });

      _g.fieldsetTextarea.on('blur', function (e) {
        if($(e.target).val().length === 0) {
          $(e.target).parent().find('label').removeClass('active');
        }
      });

      _g.accordionComment.click(function () {
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
      $("#birthdate").datepicker({ dateFormat: 'dd-mm-yy' }).val();



      /*-----------------Конец-----------------*/

      /*-----------------Функция добавления адреса-----------------*/




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
        }

        function resetAddress() {
          $('.b-cart__panel-form-new').find('input').val('');
        }

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
      _cartOrder.globals.customResurrect = function () {
      };
      _cartOrder.globals.customDestroy = function () {
      };


    };

  _cartOrder.addMethod('init', function () {
    _cartOrder.bind($window, _cartOrder.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  _init();
});
