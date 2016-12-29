"use strict";
appMakeBeCool.gateway.addClass('DefaultModule', function(properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _defaultModule = this,
    // default
    _d = {
        // elements
        // prop
        // data
        // classes ans styles
    },
    // properties
    _p = $.extend(_d, properties),
    // global
    _g = {
        // elements

        // prop
        preloaded: false
    },

    _init = function() {
        appMakeBeCool.gateway.base.Class.apply(_defaultModule, [_p]);
        if(!_g.preloaded) {
            return _defaultModule.init();
        }
        _defaultModule.globals.customCreate = function() {
            _config();
            _setup();
            _setBinds();
            _setCustomMethods();
        };
        _defaultModule.create();
    },

    _config = function() {},

    _setup = function() {},

    _setBinds = function() {},

    _binds = function() {
        return {};
    },

    _triggers = function(){
        return {};
    },

    _setCustomMethods = function() {
        _defaultModule.globals.customResurrect = function() {};
        _defaultModule.globals.customDestroy = function() {};
    };

    _defaultModule.addMethod('init', function() {
        _defaultModule.bind($window, _defaultModule.globals.classType+'_Init', function(e, data, el) {
            _g.preloaded = true;
            _init();
        });
    });

    _init();
});