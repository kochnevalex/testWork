"use strict";
appMakeBeCool.gateway.addClass('InstaSearch', function(properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _instaSearch = this,
        _d = {
            // elements
            pages: '#nextInstaPage',
            container: '#instafeed',
            photoTemplate: '#instaPhotoTemplate',
            // prop
            // data
            clientID: '8ceefba0c9404050a361592c206a536d',
            apiHost: 'https://api.instagram.com',
            userId: '309991006'
            // classes ans styles
        },
        _p = $.extend(_d, properties),
        _g = {
            // elements
            pages: null,
            photoTemplate: null,

            //data
            resource: '',
            banArray: [],
            stopped: 0,
            // prop
            preloaded: false
        },

    //PRIVATE METHODS
        _init = function() {
            appMakeBeCool.gateway.base.Class.apply(_instaSearch, [_p]);
            if(!_g.preloaded) {
                return _instaSearch.init();
            }
            _instaSearch.globals.customCreate = function() {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            };
            _instaSearch.create();
        },

        _config = function() {
            _g.pages = $(_p.pages);
            _g.container = $(_p.container);
            _g.photoTemplate = $(_p.photoTemplate).html();
        },

        _setup = function() {
            if(_g.container.length > 0) {
                search(_p.userId);
            }
        },

        _setBinds = function() {
            _binds().setScrollBinds();
        },

        _binds = function() {
            return {
                setScrollBinds: function () {
                    if(_g.container.length > 0) {
                        _instaSearch.bind($window, 'scroll', function (e, config, response) {
                            if (($document.height() - $window.height() - $document.scrollTop()) < 300) {
                                fetchPhotos(_g.pages.attr('data-maxTagId'));
                            }
                        });
                    }
                }
            };
        },

        _triggers = function(){
            return {};
        },

        toTemplate = function(photo){
            photo = {
                comments: photo.comments.count,
                likes: photo.likes.count,
                photo: photo.images.low_resolution.url,
                text: photo.caption.text,
                url: photo.link
            };

            return _instaSearch.makeTemplate(_g.photoTemplate, photo);
        },

        toScreen = function(photos){
            var photosHtml = '';

            _g.pages.attr('data-maxTagId', photos.pagination.next_max_id).fadeIn();

            $.each(photos.data, function(index, photo){
//                if(!isBanned(photo.user.username)){
                    photosHtml += toTemplate(photo);
//                }

            });

            _g.container.append(photosHtml);
            _g.stopped = 0;
        },

        fetchPhotos = function(max_id){
            if (_g.stopped == 0) {
                _g.stopped = 1;
                $.getJSON(_g.resource(max_id), toScreen);
            }
        },

        search = function (tag){
            _g.resource = generateResource(tag);
            _g.pages.hide();
            $('#instafeed *').remove();
            fetchPhotos();
        },

        generateResource = function(tag){
            var url;

            if(typeof tag === 'undefined'){
                throw new Error("Resource requires a tag. Try searching for cats.");
            } else {
                tag = String(tag).trim().split(" ")[0];
            }

            url = _p.apiHost + "/v1/users/" + tag + "/media/recent?callback=?&client_id=" + _p.clientID;
            return function(max_id){
                var next_page;
                if(typeof max_id === 'string' && max_id.trim() !== '') {
                    next_page = url + "&max_id=" + max_id;
                }
                return next_page || url;
            }
        },

        isBanned = function(user) {
            for(var i=0; i<_g.banArray.length; i++){
                if(user == _g.banArray[i]) {
                    return true;
                }
            }
            return false;
        },

        _setCustomMethods = function() {
            _instaSearch.globals.customResurrect = function() {};
            _instaSearch.globals.customDestroy = function() {};
        };

    //PUBLIC METHODS
    _instaSearch.addMethod('init', function() {
        _instaSearch.bind($window, _instaSearch.globals.classType+'_Init', function(e, data, el) {
            _g.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});

/* Пример шаблона для генерации превью из инстаграмма
<script type="text/template" id="instaPhotoTemplate">
    <div class="imp-item">
        <a href="{{url}}" target="_blank" class="imp-item-link">
            <img src="{{photo}}" alt=""/>
        </a>

        <div class="imp-descr">
            <div class="imp-txt">
                    {{text}}
            </div>
            <div class="imp-soc">
                <div class="img-soc-it">
                    <div class="imp-ic imp-lk"></div>
                        {{likes}}
                </div>
                <div class="img-soc-it">
                    <div class="imp-ic imp-sp"></div>
                        {{comments}}
                </div>
            </div>
        </div>
    </div>
</script>*/
