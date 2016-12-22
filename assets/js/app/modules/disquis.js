"use strict";

appMakeBeCool.gateway.addClass('Disquis', function (properties, $, $window, $document) {
  //PRIVATE VARIABLES
  var _disquis = this,
    _d = {
      // elements
      disquisClass: '#disqus_thread',
      leadBlock: '#lead-block',
      socialsLead: '#socials-lead',

      // prop
      leadBlockHeight: 0
      // data
      // classes ans styles
    },
    _p = $.extend(_d, properties),
    _g = {
      // elements
      slider: null,
      disquis: null,
      leadBlock: null,
      socialsLead: null,

      // prop
      preloaded: false
    },

  //PRIVATE METHODS
    _init = function () {
      appMakeBeCool.gateway.base.Class.apply(_disquis, [_p]);
      if (!_g.preloaded) {
        return _disquis.init();
      }
      _disquis.globals.customCreate = function () {
        _config();
        _setup();
        _setBinds();
        _setCustomMethods();
      }
      _disquis.create();
    },

    _config = function () {
      _g.disquis = $(_p.disquisClass);
      _g.leadBlock = $(_p.leadBlock);
      _g.socialsLead = $(_p.socialsLead);
    },

    _setup = function () {
      if (_g.disquis.length) {
        var disqus_shortname = 'litigation-ottomen';
        var dsq = document.createElement('script');
        var disqus_config = function () {
          this.page.url = PAGE_URL;
          this.page.identifier = PAGE_IDENTIFIER;
        };
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        dsq.setAttribute('data-timestamp', +new Date());
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      }
      if ($window.width() > 767) {
        _p.leadBlockHeight = _g.leadBlock.height();
        _g.socialsLead.height(_p.leadBlockHeight);
      }
    },

    _setBinds = function () {
      _binds().setAsideHeight();
    },

    _binds = function () {
      return {
        setAsideHeight: function () {
          _disquis.bind($window, 'resize', function (e, data, el) {
            if ($window.width() > 767) {
              _p.leadBlockHeight = _g.leadBlock.height();
              _g.socialsLead.height(_p.leadBlockHeight);
            }
          });
        }
      }
    },

    _triggers = function () {
      return {}
    },

    _setCustomMethods = function () {
    }

  //PUBLIC METHODS
  _disquis.addMethod('init', function () {
    _disquis.bind($window, _disquis.globals.classType + '_Init', function (e, data, el) {
      _g.preloaded = true;
      _init();
    });
  });

  //GO!
  _init();
});