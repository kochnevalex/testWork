"use strict";
appMakeBeCool.gateway.addClass('OpenBlock', function(properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _openBlock = this,
    _d = {
        // elements
        service: '.b-opening__open-desc',
        parent: '.parent-desc'
        // prop
        // data
        // classes ans styles
    },
    _p = $.extend(_d, properties),
    _g = {
        // elements
        service: null,
        parent: null,
        // prop
        preloaded: false
    },

    //PRIVATE METHODS
    _init = function() {
        appMakeBeCool.gateway.base.Class.apply(_openBlock, [_p]);
        if(!_g.preloaded) {
            return _openBlock.init();
        }
        _openBlock.globals.customCreate = function() {
            _config();
            _setup();
            _setBinds();
            _setCustomMethods();
        };
        _openBlock.create();
    },

    _config = function() {
      _g.service = $(_p.service);
      _g.parent = $(_p.parent);
    },

    _setup = function(){

    },

    _setBinds = function() {
      _binds().openService();
    },

    _binds = function() {
        return {
          openService: function () {
            $(_g.service).on('click', function (e) {
              var $parent = $(e.target).closest(_g.parent);
              $parent.find('.b-opening__item-ttl, .b-opening__open-desc').toggleClass('active');
              $parent.find('.item-full-desc').slideToggle(400);

            })
          }
        };
    },

    _triggers = function(){
        return {};
    },

    _setCustomMethods = function() {
        _openBlock.globals.customResurrect = function() {};
        _openBlock.globals.customDestroy = function() {};
    };

    //PUBLIC METHODS
    _openBlock.addMethod('init', function() {
        _openBlock.bind($window, _openBlock.globals.classType+'_Init', function(e, data, el) {
            _g.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});
