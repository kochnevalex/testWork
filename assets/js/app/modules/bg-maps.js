"use strict";
appMakeBeCool.gateway.addClass('Bgmaps', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _bgmaps = this,
      _d = {
        // elements
        mapCanvas: '.map-canvas',
        scriptUrl: 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'callback=addMapContacts',
        mapFormBtn: '#map-form',
        mapMapBtn: '#map-map',
        mapForm: '#form-map',
        mapObj: {}

        // prop
        // data
        // classes ans styles
      },
      _p = $.extend(_d, properties),
      _g = {
        // elements
        mapCanvas: null,
        mapFormBtn: null,
        mapMapBtn: null,
        mapForm: null,
        // prop
        preloaded: false
      },

  //PRIVATE METHODS
      _init = function () {
        appMakeBeCool.gateway.base.Class.apply(_bgmaps, [_p]);
        if (!_g.preloaded) {
          return _bgmaps.init();
        }
        _bgmaps.globals.customCreate = function () {
          _config();
          _setup();
          _setBinds();
          _setCustomMethods();
        };
        _bgmaps.create();
      },

      _config = function () {
        _g.mapCanvas = $(_p.mapCanvas);
        _g.mapFormBtn = $(_p.mapFormBtn);
        _g.mapMapBtn = $(_p.mapMapBtn);
        _g.mapForm = $(_p.mapForm);

      },

      _setup = function () {
        if (_g.mapCanvas.length && !(window.detectDevice.mobile())) {
          _loadScripts();
          window.addMapContacts = function () {
            if (_g.mapCanvas.length && !(window.detectDevice.mobile())) {
              _g.mapCanvas.each(function () {
                var $mapCanvas = $(this);
                var lat = $mapCanvas.data('lat');
                var long = $mapCanvas.data('long');
                var contentString = '<p>' + $mapCanvas.data('text') + '</p>';
                var infowindow = new google.maps.InfoWindow({content: contentString});
                var contactsLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                  zoom: 14,
                  panControl: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  overviewMapControl: false,
                  center: contactsLatlng,
                  scrollwheel: false,
                  draggable: $window.width() < 1280 ? false : true,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                _p.mapObj = new google.maps.Map($mapCanvas[0], mapOptions);

                var marker = new google.maps.Marker({
                  position: contactsLatlng,
                  map: _p.mapObj
                });
                marker.addListener('click', function () {
                  infowindow.open(_p.mapObj, marker);
                });

              });
            }
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

      _loadScripts = function () {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = _p.scriptUrl;
        document.body.appendChild(script);
      },

      _setCustomMethods = function () {
        _bgmaps.globals.customResurrect = function () {
        }
        _bgmaps.globals.customDestroy = function () {
        }
      }

  //PUBLIC METHODS
  _bgmaps.addMethod('init', function () {
    _bgmaps.bind($window, _bgmaps.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});