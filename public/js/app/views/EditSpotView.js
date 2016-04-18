/*jshint -W065 */
define(['jquery', 'hbs!templates/editspot', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            spot: null,
            model: null,
            events: {
                'click .add-close': 'close',
                'click .toggle div': 'toggle',
                'click .save-spot-button': 'save'
            },
            initialize: function(options) { 
                this.spot = JSON.parse(localStorage.spot);

                var isSlow = false;
                var isMed = false;
                var isFast = false;

                if (this.spot.speed === 0) {
                    isSlow = true;
                }
                if (this.spot.speed === 1) {
                    isMed = true;
                }
                if (this.spot.speed === 2) {
                    isFast = true;
                }
                this.model = new Model({spot: this.spot, isSlow: isSlow, isMed: isMed, isFast: isFast});
            },
            onRender: function () {
                var self = this;
             spotpop.api.core.cleanView(this, true, true); // gets view ready to be rendered    
             setTimeout(function(){ 
                self.initAutocomplete();                      
             }, 0);  
            },
            close: function() {
                spotpop.appRouter.navigate('map', {trigger: true});

            },
            toggle: function(e) {
                $(e.currentTarget).siblings().removeClass('active');
                $(e.currentTarget).addClass('active');
            },
            save: function() {
                var spot = {};
                var form = spotpop.api.core.getFormObj('.add-spot-form');
                spot = form;
                spot._id = this.spot._id;
                spot.good_for_working = parseInt($('.work-toggle .active').data('gfw'));
                spot.speed = parseInt($('.speed-toggle .active').data('speed'));
                spot.outlets = parseInt($('.outlet-toggle .active').data('outlets'));
                spot.owner = parseInt(spotpop.api.users.current().id);
                spot.location = window.spotpop.latlng;                

                if (spot.password) {
                    spot.is_public = false;
                } else {
                    spot.is_public = true;
                }

                if (spot && spot.business && spot.owner) {
                   $('.add-wait').removeClass('hide');
                    spotpop.api.wifi.savespot(spot);
                } else {
                    alert('please fill in all required fields!');
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
                    /** @type {!HTMLInputElement} */(document.getElementById('address')),
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
              }
        });
    });