define(['jquery', 'hbs!templates/myfaves', 'backbone','models/Model', 'marionette'],
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
                spotpop.api.core.cleanView(this, true); // gets view ready to be rendered    
                setTimeout(function(){ 
                    spotpop.api.wifi.showmyfaves('#my-faves-list');               
                }, 0);  
            }
        });
    });