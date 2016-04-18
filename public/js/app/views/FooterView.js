define(['jquery', 'hbs!templates/footer', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
                'click .add-button': 'add',
                'click .list-view': 'list',
                'click .map-view': 'map'
            },
            initialize: function(options) {  
                var location = window.location.hash;
                var isMap = false;

                if (location === '#map') {
                    isMap = true;
                }              

                this.model = new Model({isMap: isMap});
            },
            onRender: function () {
             spotpop.api.core.cleanView(this); // gets view ready to be rendered    
            },
            add: function() {
                spotpop.appRouter.navigate('add-spot', {trigger: true});
            },
            list: function() {
                spotpop.appRouter.navigate('list', {trigger: true});
            },
            map: function() {
                spotpop.appRouter.navigate('map', {trigger: true});
            }
        });
    });