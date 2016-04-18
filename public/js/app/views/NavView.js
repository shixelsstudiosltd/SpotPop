define(['jquery', 'hbs!templates/nav', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
                'click .refresh-map': 'refreshmap',
                'click .refresh-list': 'refreshlist',
                'click .refresh-faves': 'refreshfaves',
                'click .refresh-spots': 'refreshspots',
                'click .nav-button': 'shownav',
                'click .add-spot': 'add',
                'click .filter-search': 'filter',
                'click .filter-radio': 'radio',
                'click .show-filter': 'showfilter',
                'click .edit-account': 'editaccount',
                'click .exit-edit': 'exit',
                'keyup #nav-search': 'search',
                'keydown #nav-search': 'search'
                
            },
            initialize: function(options) {
                var location = window.location.hash;
                var isMap = false;
                var isMine = false;
                var isList = false;
                var isRefresh = false;
                var isAccount = false;
                var isAdd = false;
                var isFaves = true;
                var title = null;

                if (location === '#map') {
                    isMap = true;
                }              

                if (location === '#my-spots') {
                    isMine = true;
                    isAdd = true;
                }

                if (location === '#list') {
                    isList = true;
                }

                if (location === '#my-account') {
                    isAccount = true;
                }

                if ((isList || isMap) && !isAccount) {
                    isRefresh = true;
                    isAdd = true;
                }

                if (location == '#my-faves') {
                    isRefresh = true;
                    isFaves = true;
                }


                if (options && options.title) {
                    title = options.title;
                }

                this.model = new Model({isMap: isMap, title: title, isRefresh: isRefresh, isAdd: isAdd, isAccount: isAccount, isMine: isMine, isFaves: isFaves, isList: isList});                
            },
            onRender: function () {
                var self = this;
                var location = window.location.hash;
                spotpop.api.core.cleanView(this); // gets view ready to be rendered  
                setTimeout(function() {
                    
                        $('#main-body-container').on('click', function(e) {
                            if ($('.nav-menu').hasClass('open')) {
                                self.shownav(e);
                            }
                        });
                        if (location === '#map') {
                            self.initAutocomplete();   
                        }
                    
                }, 0);  
            },
            refreshmap: function(e) {
                $(e.currentTarget).addClass('fa fa-spin');
                $('#spotpop-map').html('<div class="loading-map"><i class="ionicons ion-load-c orange fa fa-spin"></i> Refreshing Map...</div>');
                spotpop.api.wifi.shownearspots();
            },
            refreshlist: function(e) {
                $(e.currentTarget).addClass('fa fa-spin');
                $('#spotpop-list').html('<div class="loading-list"><i class="ionicons ion-load-c orange fa fa-spin"></i> Refreshing Spots...</div>');
                spotpop.api.wifi.shownearlist('#spotpop-list');
            },
            refreshspots: function(e) {
                $(e.currentTarget).addClass('fa fa-spin');
                $('#my-spots-list').html('<div class="loading-list"><i class="ionicons ion-load-c orange fa fa-spin"></i> Refreshing Your Spots...</div>');
                spotpop.api.wifi.showmyspots('#my-spots-list');
            },
            refreshfaves: function(e) {
                $(e.currentTarget).addClass('fa fa-spin');
                $('#my-faves-list').html('<div class="loading-list"><i class="ionicons ion-load-c orange fa fa-spin"></i> Refreshing Your Faves...</div>');
                spotpop.api.wifi.showmyfaves('#my-faves-list');
            },
            shownav: function(e) {

                if ($('.nav-menu').hasClass('open')) {
                    $('.nav-menu').css('width', '0');
                    $('.nav-menu a').hide();
                    $('.nav-menu').removeClass('open');
                    $('#main-body-container').css('left', '0');
                } else {
                    $('.nav-menu').css('width', '85%');
                    setTimeout(function() {
                        $('.nav-menu a').fadeIn().css('display', 'block');
                    }, 150);  
                    
                    $('.nav-menu').addClass('open');
                    $('#main-body-container').css('left', '85%');
                }
                
            },
            add:function() {
                spotpop.appRouter.navigate('add-spot', {trigger: true});
            },
            filter: function() {

            },
            radio: function(e) {
                $(e.currentTarget).toggleClass('ion-android-radio-button-off').toggleClass('ion-android-radio-button-on');
            },
            showfilter: function(e) {
                if ($('.filter-menu').hasClass('open')) {
                    $('.filter-menu').css('width', '0');
                    $('.filter-cat').hide();
                    $('.apply-filters').hide();
                    $('.filter-menu .title').hide();
                    $('.filter-menu').removeClass('open');
                    $('#main-body-container').css('left', '0');
                } else {
                    $('.filter-menu').css('width', '82%');
                    setTimeout(function() {
                        $('.filter-cat').fadeIn().css('display', 'block');
                        $('.apply-filters').fadeIn().css('display', 'block');
                        $('.filter-menu .title').fadeIn().css('display', 'block');
                    }, 150);  
                    
                    $('.filter-menu').addClass('open');
                    $('#main-body-container').css('left', '82%');
                }
            },
            editaccount: function(e) {
                $('.account-settings').hide();
                $('.save-changes').show();
                $(e.currentTarget).removeClass('edit-account ionicons ion-edit orange').addClass('exit-edit ionicons ion-close orange');
                var edits = $('.account-line h3');

                for (var ecount = 0; ecount < edits.length; ecount++) {
                    var edit = edits[ecount];
                    var edit_val = $(edit).text();
                    if (!$(edit).hasClass('settings-line')) {
                        $(edit).html('<input class="' + $(edit).data('name') +'" type="text" value="' + edit_val + '" name="' + $(edit).data('name') + '"/>');
                    }
                    

                }
            },
            exit: function(e) {
                $('.account-settings').show();
                $('.save-changes').hide();
                $(e.currentTarget).addClass('edit-account ionicons ion-edit orange').removeClass('exit-edit ionicons ion-close orange');
                var edits = $('.account-line h3 input');

                for (var ecount = 0; ecount < edits.length; ecount++) {
                    var edit = edits[ecount];
                    var edit_val = $(edit).val();
                    console.log(edit, edit_val);
                    if (!$(edit).hasClass('settings-line')) {
                        $(edit).replaceWith(edit_val);
                    }
                    

                }
            },
            geolocate: function() {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position) {
                    var geolocation = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                      center: geolocation,
                      radius: position.coords.accuracy
                    });
                    autocomplete.setBounds(circle.getBounds());
                  });
                }
            },
            initAutocomplete: function() {
                var self = this;
                // Create the autocomplete object, restricting the search to geographical
                // location types.
                //console.log(google, google.maps, google.maps.places);
                autocomplete = new google.maps.places.Autocomplete(
                    /** @type {!HTMLInputElement} */(document.getElementById('nav-search')),
                    {types: ['geocode']});

                // When the user selects an address from the dropdown, populate the address
                // fields in the form.
                autocomplete.addListener('place_changed', self.fillInAddress);
              },
              fillInAddress: function() {

                // Get the place details from the autocomplete object.
                var place = autocomplete.getPlace();
                //console.log(place, this);
                window.spotpop.latlng = [place.geometry.location.lat(), place.geometry.location.lng()];
                //console.log(window.kudi.latlng);

                $('#spotpop-map').html('<div class="loading-map"><i class="ionicons ion-load-c orange fa fa-spin"></i> Refreshing Map...</div>');
                spotpop.api.wifi.shownearaddress(place.geometry.location.lat(), place.geometry.location.lng());
              },
              search: function() {
                var location = window.location.hash;
                var term = $('#nav-search').val();
                var where = null;
                var type = null;

                if (location === '#list') {
                    where = '#spotpop-list';
                    type = 'all';
                }

                if (location === '#my-faves') {
                    where = '#my-faves-list';
                    type = 'faves';
                }

                if (location === '#my-spots') {
                    where = '#my-spots-list';
                    type = 'mine';

                }
                 if (location === '#search') {
                    where = '#my-search-list';
                    type = 'all';

                }
                if (location !== '#map') {
                    if (type === 'faves' && spotpop.api.users.current().custom_data && spotpop.api.users.current().custom_data.likes && (spotpop.api.users.current().custom_data.likes.length === 0)) {
                        $(where).html('<div class="loading-list">No Favourites!</div>');
                    } else {
                        if (term) {
                            $(where).html('<div class="loading-list"><i class="ionicons ion-load-c orange fa fa-spin"></i> Searching Spots...</div>');
                            spotpop.api.wifi.search(term, where, type);
                        } else {
                             spotpop.api.wifi.shownearlist(where);    
                        }
                    }
                    
                    
                }   
              }
        });
    });