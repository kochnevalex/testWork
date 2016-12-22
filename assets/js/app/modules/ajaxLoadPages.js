appMakeBeCool.gateway.addClass('AjaxLoadPages', function(properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _ajaxLoadPages = this,
    _d = {
        // elements
        container: '#containerItems'
        // prop
        // data
        // classes ans styles
    },
    _p = $.extend(_d, properties),
    _g = {
        // elements
        container: null,

        // prop
        preloaded: false
    },

    //PRIVATE METHODS
    _init = function() {
        appMakeBeCool.gateway.base.Class.apply(_ajaxLoadPages, [_p]);
        if(!_g.preloaded) {
            return _ajaxLoadPages.init();
        }
        _ajaxLoadPages.globals.customCreate = function() {
            _config();
            _setup();
            _setBinds();
            _setCustomMethods();
        };
        _ajaxLoadPages.create();
    },

    _config = function() {
        _g.container = $(_p.container);
    },

    _setup = function() {
        if(_g.container.length > 0)
            _g.container.endlessscroll();
    },

    _setBinds = function() {},

    _binds = function() {
        return {};
    },

    _triggers = function(){
        return {};
    },

    _setCustomMethods = function() {
        _ajaxLoadPages.globals.customResurrect = function() {};
        _ajaxLoadPages.globals.customDestroy = function() {};
    };

    //PUBLIC METHODS
    _ajaxLoadPages.addMethod('init', function() {
        _ajaxLoadPages.bind($window, _ajaxLoadPages.globals.classType+'_Init', function(e, data, el) {
            _g.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});