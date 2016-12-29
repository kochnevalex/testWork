appMakeBeCool.gateway.addClass('SectionTabs', function(properties, $, $window, $document) {

    //PRIVATE VARIABLES
    var _sectionTabs = this,
    _defaults = {
        // elements
        triggerItems: '.trigger-tabs',
        parentSelector: 'section',
        contentContainer: '.pageContent'
    },
    _properties = $.extend(_defaults, properties),
    _globals = {
        // elements
        triggerItems: null,

        // data
        ajaxRequest: null,
        overlayHTML: null,

        // prop
        preloaded: false
    },

    //PRIVATE METHODS
    _init = function() {
        appMakeBeCool.gateway.base.Class.apply(_sectionTabs, [_properties]);
        if(!_globals.preloaded) {
            return _sectionTabs.init();
        }
        _sectionTabs.globals.customCreate = function() {
            _config();
            _setup();
            _setBinds();
            _setCustomMethods();			
            //Load Sections
        };
        _sectionTabs.create();
    },

    _config = function() {
        _globals.triggerItems = $(_properties.triggerItems);
    },

    _setup = function() {},
	
    _setBinds = function() {
        _binds().setTabsBinds();
    },
    
    _binds = function() {
        return {
            setTabsBinds: function() {
                _sectionTabs.unbind(_globals.triggerItems, 'click');
                _sectionTabs.bind(_globals.triggerItems, 'click', function(e, data, el) {
                    e.preventDefault();
                    var $this = $(el);
                    var parent = $this.closest(_properties.parentSelector);
                    _ajaxLoad({url:$this.attr('href'), parent:parent});
                });
            }
        }
    },

    _triggers = function(){
        return {
            getInsertPageTrigger: function(data){
                _sectionTabs.trigger(_sectionTabs.globals.classType+'_InsertPage', data);
            },
            getBeforeLoadPageTrigger: function(data){
                _sectionTabs.trigger(_sectionTabs.globals.classType+'_BeforeLoadPage', data);
            }
        }
    },

    _setCustomMethods = function() {
        _sectionTabs.globals.customResurrect = function() {}; 
        _sectionTabs.globals.customDestroy = function() {};
    },
	
    _insertPage = function(options) {
        var _options = $.extend({overlayHTML:null, parent:null}, options);
        $overlayHTML = $(_options.overlayHTML);

        _options.parent.children(_properties.contentContainer).animate({
            opacity: 0
        }, 500, function(){
            _options.parent.removeAttr('data-info').attr('data-info', $overlayHTML.attr('data-info'));
            _options.parent.html($overlayHTML.html());
            _options.parent.children(_properties.contentContainer).animate({
                opacity: 1
            }, 500, function(){
                _init();
                _triggers().getInsertPageTrigger({obj: _options.parent, stateObj: {push: false}});
            });
        });
        
    },
	
    _ajaxLoad = function(options) {
        var _options = $.extend({url:null, parent:null}, options);
        _globals.ajaxRequest = $.ajax({
            url:_options.url,
            cache: true,
            async: true,
            dataType: 'html',
            beforeSend: function(){
                _triggers().getBeforeLoadPageTrigger({parent: _options.parent.attr('id')});
            },
            success: function(overlayHTML){
                _insertPage({overlayHTML:overlayHTML, parent:_options.parent});
            },
            error: function() {}
        });	
    };

    //PUBLIC METHODS
    _sectionTabs.addMethod('init', function() {
        _sectionTabs.bind($window, _sectionTabs.globals.classType+'_Init', function(e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});