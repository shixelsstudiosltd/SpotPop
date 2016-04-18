define(['jquery', 'hbs!templates/spotfooter', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            spot: null,
            events: {
                'click .pop-it': 'pop',
                'click .stop-it': 'stop'
            },
            initialize: function(options) {  
                this.spot = JSON.parse(localStorage.spot);
            },
            onRender: function () {
             spotpop.api.core.cleanView(this); // gets view ready to be rendered    
            },
            pop: function() {
                $('.pop-it i').removeClass('ion-thumbsup').addClass('ion-load-c fa fa-spin');
                spotpop.api.wifi.popit(this.spot._id);
            },
            stop: function() {
                $('.stop-it i').removeClass('ion-thumbsdown').addClass('ion-load-c fa fa-spin');
                spotpop.api.wifi.stopit(this.spot._id);
            }
        });
    });