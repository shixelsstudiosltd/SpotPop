define(['jquery', 'hbs!templates/help', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
                'click .about-spot': 'about',
                'click .bug-report': 'bugs'
            },
            initialize: function(options) {                
            },
            onRender: function () {
             spotpop.api.core.cleanView(this, true, true); // gets view ready to be rendered    
            },
            about: function() {
                spotpop.appRouter.navigate('about', {trigger: true});
            },
            bugs: function() {
                spotpop.appRouter.navigate('bugs', {trigger: true});
            }
        });
    });