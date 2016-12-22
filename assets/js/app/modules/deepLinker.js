appMakeBeCool.gateway.addClass('DeepLinker', function(properties, $, $window, $document) {

    //PRIVATE VARIABLES
    var _deepLinker = this,
    _d = {
        // prop
        deeplinkAttr: 'data-info'
    },
    _p = $.extend(_d, properties),
    _g = {
        // prop
        preloaded: false
    },

    //PRIVATE METHODS

    _init = function() {
        appMakeBeCool.gateway.base.Class.apply(_deepLinker, [_p]);
        if(!_g.preloaded) {
            return _deepLinker.init();
        }
        _deepLinker.globals.customCreate = function() {
            _config();
            _setup();
            _setBinds();
            _setCustomMethods();
        };
        _deepLinker.create();
    },
    _config = function() {},

    _setup = function() {},

    _setBinds = function() {
        _binds().setDeeplinkUpdateBind();
        _binds().setPopstateBind();	
    },

    _binds = function() {
        return {
            setDeeplinkUpdateBind: function() {
                _deepLinker.bind($window, _deepLinker.globals.classType+'_LinkUpdate', function(e, data, el) {
                    _updateDeeplink(data.obj, data.stateObj);
                });
            },
            /**
             * TODO реализовать возвращение назад
             */
            setPopstateBind: function() {
                $window.onpopstate = function(e) {
                    if (e.state) {
                        var returnLocation = history.location || document.location;
                        $.xhrPool.abortAll();
                        window.location = returnLocation.href;
//                    _popHandler(e);
                    }
                };
            }		
        };		
    },

    _setCustomMethods = function() {
        _deepLinker.globals.customResurrect = function() {}; 
        _deepLinker.globals.customDestroy = function() {};
    },

    _popHandler = function(e) {
        if(e.state) {
            var _stateData = e.state;
//            if(_stateData.overlayUrl) {
//                if(!mbc.gateway.classInstances.mediaOverlay.isOpen()) {
//                    return mbc.gateway.classInstances.mediaOverlay.open(_stateData.overlayUrl, {snapIt: false});
//                }
//            } else if(mbc.gateway.classInstances.mediaOverlay.isOpen()) {
//                mbc.gateway.classInstances.mediaOverlay.close({snapIt: false});
//            }
        }
    },
    
    //PLEASE FIX THIS!
    _updateAddress = function(data, stateObj) {
        var _data = data;
        stateObj.url = _data.url;
        if(_data.longtitle == '') {
            document.title = _data.pagetitle;
        } else {
            document.title = _data.longtitle;
        }
        $('meta[name="description"]').attr('content', _data.description);
//        if (!window.history || !window.history.pushState){
//            //ie
//            if (window.location.href.split(document.domain)[1].indexOf(_data.url) == -1) {
//                window.location.hash = _data.url;		
//                if (oMGB.gateway.classInstances.googleAnalytics) {
//					oMGB.gateway.classInstances.googleAnalytics.trackPageview();
//				}
//			}
//			
//		} else {
        if('/'+_data.url == window.location.pathname) {
//            _deepLinker.log('DO NOTHING: ', stateObj);
            return false;
        } else if(!stateObj.push) { 
//            _deepLinker.log('REPLACE: ', stateObj);
            window.history.replaceState(stateObj, "", _data.url);
             if(typeof _gaq != 'undefined'){
                _gaq.push(["_trackPageview", _data.url]);
             }
//            if (mbc.gateway.classInstances.googleAnalytics) {
//                mbc.gateway.classInstances.googleAnalytics.trackPageview();
//            }
        } else {
            if(typeof _gaq != 'undefined'){
                _gaq.push(["_trackPageview", _data.url]);
             }
//            _deepLinker.log('PUSH: ', stateObj);
            window.history.pushState(stateObj, "", _data.url);	
//            if (mbc.gateway.classInstances.googleAnalytics) {
//                mbc.gateway.classInstances.googleAnalytics.trackPageview();
//            }
        }				
        //window.history.replaceState('Object', 'Title', data.url);
//		}	
    },
    _getDeeplinkData = function($obj) {
        return $.parseJSON($obj.attr(_p.deeplinkAttr));
    },

    _updateDeeplink = function($obj, stateObj) {
        if($obj.length !== 1) return _deepLinker.logError('$obj passed to updateDeeplink() is invalid');
        var _deeplinkData = _getDeeplinkData($obj);
        var _stateObj = $.extend({state: 'main', push: true, overlayUrl: ''}, stateObj);
        if(!_deeplinkData) return _deepLinker.logError('_deeplinkData in updateDeeplink() is not a valid JSON object');
        _updateAddress(_deeplinkData, _stateObj);
    };
	
    //PUBLIC METHODS
    _deepLinker.addMethod('init', function() {
        _deepLinker.bind($window, _deepLinker.globals.classType+'_Init', function(e, data, el) {
            _g.preloaded = true;
            _init();
        });
    });
//    this.updateDeeplink = function($obj, stateObj) {
//        if($obj.length !== 1) return _deepLinker.logError('$obj passed to updateDeeplink() is invalid');
//        var _deeplinkData = _getDeeplinkData($obj);
//        var _stateObj = $.extend({state: 'main', push: true, overlayUrl: ''}, stateObj);
//        if(!_deeplinkData) return _deepLinker.logError('_deeplinkData in updateDeeplink() is not a valid JSON object');
//        _updateAddress(_deeplinkData, _stateObj);
//    };

    //GO!
    _init();
});