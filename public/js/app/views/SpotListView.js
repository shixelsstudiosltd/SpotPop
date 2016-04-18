/*jshint -W065 */
define(['jquery', 'hbs!templates/spotlist', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            spot: null,
            events: {
                'click .view-spot': 'viewspot'
            },
            initialize: function(options) {     
                this.spot = options.spot;
                var totalrating = this.spot.pops + this.spot.stops;

                if (totalrating === 0) {
                    this.spot.stop_rating = '- %';
                    this.spot.pop_rating ='- %';
                } else {
                    this.spot.stop_rating = ((parseInt(this.spot.stops) / parseInt(totalrating)) * 100).toFixed(2) + '%';
                    this.spot.pop_rating = ((parseInt(this.spot.pops) / parseInt(totalrating)) * 100).toFixed(2) + '%';
                }
                this.model = new Model({spot: this.spot});
            },
            onRender: function () {
             spotpop.api.core.cleanView(this); // gets view ready to be rendered    
            },
            viewspot: function(){
                console.log(this.spot);
                localStorage.spot = JSON.stringify(this.spot);
               spotpop.appRouter.navigate('spot', {trigger: true});
            }
        });
    });