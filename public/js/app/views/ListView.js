define(['jquery', 'hbs!templates/list', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
            },
            initialize: function(options) {                
            },
            onRender: function () {
                var self = this;
                spotpop.api.core.cleanView(this); // gets view ready to be rendered    
                setTimeout(function(){ 
                    spotpop.api.wifi.shownearlist('#spotpop-list');               
                }, 0);  
            }
        });
    });