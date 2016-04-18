define(['jquery', 'hbs!templates/splash', 'backbone','models/Model', 'marionette'],
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
         setTimeout(function() {
            spotpop.appRouter.navigate('login', {trigger: true});
         }, 1000);     
        }
    });
});