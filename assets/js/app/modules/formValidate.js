"use strict";
appMakeBeCool.gateway.addClass('FormValidate', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _formValidate = this,
    _d = {
      // elements
      forms: ['.form[data-form="contact"]',
        '.form[data-form="subscribe"]']
      // prop
      // data
      // classes ans styles
    },
    _p = $.extend(_d, properties),
    _g = {
      // elements
      forms: [],

      // prop
      preloaded: false
    },

  //PRIVATE METHODS
    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_formValidate, [_p]);
      if (!_g.preloaded) {
        return _formValidate.init();
      }
      _formValidate.globals.customCreate = function () {
        _config();
        _setup();
        _setBinds();
        _setCustomMethods();
      };
      _formValidate.create();
    },

    _config = function () {
      if (_p.forms.length) {
        for (var i in _p.forms) {
          _g.forms.push($(_p.forms[i]));
        }
      }
    },

    _setup = function () {
      if (_g.forms.length) {
        for (var i in _g.forms) {
          _g.forms[i].validate({
            rules: {
              name: {
                required: true,
                minlength: 2
              },
              email: {
                required: true,
                email: true
              },
              skype: {
                required: true
              }
            },
            messages: {
              name: {
                required: global.validationMessages.name,
                minlength: global.validationMessages.nameMinLength
              },
              email: {
                required: global.validationMessages.emailRequired,
                email: global.validationMessages.email
              },
              text: global.validationMessages.text,
              skype: {
                required: global.validationMessages.skypeRequired
              },
              message: global.validationMessages.text
            },
            errorPlacement: function(error, element) {
              $(element).parent().addClass('error');
              $(element).parent().append(error);
            },
            success: function(element){
              $(element).parent().removeClass('error');
            }
          });
        }
      }

      _phoneInputMask();
      _textareaAutosize();
    },

    _setBinds = function () {
    },

    _binds = function () {
      return {}
    },

    _triggers = function () {
      return {}
    },

    _phoneInputMask = function () {
      if ($('input[type="tel"]').length) {
        $('input[type="tel"]').inputmask({
          mask: '+99 (999) 99-99-999',
          placeholder: ' ',
          showMaskOnHover: false,
          showMaskOnFocus: true,
          onBeforePaste: function (pastedValue, opts) {
            var processedValue = pastedValue;
            return processedValue;
          }
        });
      }
    },

    _textareaAutosize = function () {
      if ($('textarea').length) {
        autosize($('textarea'));
      }
    },

    _setCustomMethods = function () {
      _formValidate.globals.customResurrect = function () {
      };
      _formValidate.globals.customDestroy = function () {
      };
    };

  //PUBLIC METHODS
  _formValidate.addMethod('init', function () {
    _formValidate.bind($window, _formValidate.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});
