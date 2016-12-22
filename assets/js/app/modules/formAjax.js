"use strict";
appMakeBeCool.gateway.addClass('FormAjax', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _formAjax = this,
      _d = {
        // elements
        forms: [],
        successMessageSuffix: 'SuccessMessage',
        errorMessageSuffix: 'ErrorMessage'
        // prop
        // data
        // classes ans styles
      },
      _p = $.extend(_d, properties),
      _g = {
        // elements
        forms: [],
        successMessages: [],
        errorMessages: [],
        // prop
        preloaded: false
      },

  //PRIVATE METHODS
      _init = function () {
        appMakeBeCool.gateway.base.Class.apply(_formAjax, [_p]);
        if (!_g.preloaded) {
          return _formAjax.init();
        }
        _formAjax.globals.customCreate = function () {
          _config();
          _setup();
          _setBinds();
          _setCustomMethods();
        };
        _formAjax.create();
      },

      _config = function () {
        if (_p.forms.length) {
          for (var i in _p.forms) {
            _g.forms.push($(_p.forms[i]));
            _g.successMessages.push($(_p.forms[i] + _p.successMessageSuffix));
          }
        }
      },

      _setup = function () {
        if (_g.forms.length) {
          for (var i in _g.forms) {
            _g.forms[i].ajaxForm({
              dataType: 'json',
              beforeSubmit: _formBeforeSubmit,
              success: _formSuccess,
              error: _formError
            });
          }
        }
      },

      _setBinds = function () {
      },

      _binds = function () {
        return {}
      },

      _triggers = function () {
        return {}
      },

      _setCustomMethods = function () {
        _formAjax.globals.customResurrect = function () {
        };
        _formAjax.globals.customDestroy = function () {
        };
      },

      _formBeforeSubmit = function (arr, $form, options) {
      },

      _formError = function (response, statusText, xhr, $form) {
        if (response.error) {
          $form.removeClass('show').addClass('hide');
          var formErrorMessageId = $form.attr('id') + _p.errorMessageSuffix;
          var $message = $('#' + formErrorMessageId);
          var $btn = $message.find('.btn');
          $message.addClass('active');
          $btn.on('click', function () {
            $form.removeClass('hide').addClass('show');
            $message.removeClass('active');
          });
        } else {
          for (var key in response.errors) {
            var el = $('#' + key);
            el.addClass('error');
          }
        }
      },

      _formSuccess = function (response, statusText, xhr, $form) {
        if (response.success) {
          $form.removeClass('show').addClass('hide');
          var formSuccessMessageId = $form.attr('id') + _p.successMessageSuffix;
          var $message = $('#' + formSuccessMessageId);
          var $btn = $message.find('.btn');
          $message.addClass('active');
          $btn.on('click', function () {
            $form.resetForm();
            $form.removeClass('hide').addClass('show');
            $message.removeClass('active');
          });
        } else {
          for (var key in response.errors) {
            var el = $('#' + key);
            el.addClass('error');
          }
        }
      };

  //PUBLIC METHODS
  _formAjax.addMethod('init', function () {
    _formAjax.bind($window, _formAjax.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});