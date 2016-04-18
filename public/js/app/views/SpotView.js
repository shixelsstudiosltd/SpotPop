/*jshint -W065 */
define(['jquery', 'hbs!templates/spot', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            spot: null,
            events: {
            },
            initialize: function(options) {    
                this.spot = JSON.parse(localStorage.spot);
                this.spot.is_slow = false;
                this.spot.is_med = false;
                this.spot.is_fast = false;
                
                var totalrating = this.spot.pops + this.spot.stops;

                if (totalrating === 0) {
                    this.spot.stop_rating = '- %';
                    this.spot.pop_rating ='- %';
                } else {
                    this.spot.stop_rating = ((parseInt(this.spot.stops) / parseInt(totalrating)) * 100).toFixed(2) + '%';
                    this.spot.pop_rating = ((parseInt(this.spot.pops) / parseInt(totalrating)) * 100).toFixed(2) + '%';
                }
                

                if (this.spot.speed === 0){
                    this.spot.is_slow = true;
                } else if (this.spot.speed === 1) {
                    this.spot.is_med = true;
                } else {
                    this.spot.is_fast = true;
                }
                this.model = new Model({spot: this.spot});
                console.log(this.spot);
            },
            onRender: function () {
                var self = this;
                spotpop.api.core.cleanView(this); // gets view ready to be rendered  
                setTimeout(function() {
                    $('.spot-title').html('<h1>"' + self.spot.ssid + '"</h1><h2>' + self.spot.business + '</h2>');
                }, 0);  
            }
        });
    });