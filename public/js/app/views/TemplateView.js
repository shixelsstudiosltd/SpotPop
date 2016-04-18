define(['jquery', 'hbs!templates/template', 'backbone','models/Model', 'marionette'],
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
             spotpop.api.core.cleanView(this); // gets view ready to be rendered    
            }
        });
    });