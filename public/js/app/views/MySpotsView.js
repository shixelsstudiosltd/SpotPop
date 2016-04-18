define(['jquery', 'hbs!templates/myspots', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
                'click .refresh-list': 'refresh'
            },
            initialize: function(options) {                
            },
            onRender: function () {
                var self = this;
                spotpop.api.core.cleanView(this, true); // gets view ready to be rendered    
                setTimeout(function(){ 
                    spotpop.api.wifi.showmyspots('#my-spots-list');               
                }, 0);  
            },
            refresh: function() {
                spotpop.api.wifi.showmyspots('#my-spots-list');            
            }
        });
    });