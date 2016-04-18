define(['jquery', 'hbs!templates/spotnav', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            spot: null,
            events: {
                'click .back-button': 'back',
                'click .like-spot': 'like',
                'click .unlike-spot': 'unlike',
                'click .edit-spot': 'edit'
            },
            initialize: function(options) {    
                var title = null;
                var user = spotpop.api.users.current().id;
                var user_likes = spotpop.api.users.current().custom_data.likes;
                this.spot = JSON.parse(localStorage.spot);
                var showEdit = false;
                var isLiked = false;


                if (this.spot.owner === user) {
                    showEdit = true;
                } else {
                    if (user_likes) {
                        for (var lcount = 0; lcount < user_likes.length; lcount++) {
                            var liked = user_likes[lcount];
                            if (this.spot._id === liked) {
                                isLiked = true;
                            }
                        }
                    }
                }

                if (location === '')
                if (options && options.title) {
                    title = options.title;
                }

                this.model = new Model({title: title, showEdit: showEdit, isLiked: isLiked});            
            },
            onRender: function () {
             spotpop.api.core.cleanView(this); // gets view ready to be rendered    
            },
            back: function() {
                window.history.back();
            },
            like: function(e) {
                $(e.currentTarget).removeClass('ion-android-favorite-outline').addClass('ion-load-c fa fa-spin');
                spotpop.api.wifi.like(this.spot._id);
            },
            unlike: function(e) {
                $(e.currentTarget).removeClass('ion-android-favorite').addClass('ion-load-c fa fa-spin');
                spotpop.api.wifi.unlike(this.spot._id);
            },
            edit: function() {
                spotpop.appRouter.navigate('edit-spot', {trigger: true});
            }
        });
    });