define(['jquery', 'hbs!templates/myaccount', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
                'click .save-changes': 'save',
                'click .reset-password': 'reset',
                'click .close-button': 'close',
                'click .logout-account': 'logout'
            },
            initialize: function(options) {     
                var user = spotpop.api.users.current();
                console.log(user);
                this.model = new Model({user: user});
            },
            onRender: function () {
             spotpop.api.core.cleanView(this, true, true); // gets view ready to be rendered    
            },
            save: function(e) {
                var form = {};
                form.login = $('.login').val();
                form.full_name = $('.full_name').val();
                form.phone = $('.phone').val();
                form.email = $('.email').val();
                console.log(form);
                $(e.currentTarget).html('<i class="ionicons ion-load-c fa fa-spin"></i> Saving Changes...');
                spotpop.api.users.update(form);
            },
            reset: function() {
                var email = $('.email').text();
                if (email) {
                    $('.reset-password h3').html('<i class="as-icon ionicons ion-load-c fa fa-spin"></i> Sending Reset Link...');
                    spotpop.api.users.resetpassword(email);
                } else {
                    $('.alert p').html('Please update your account with an email address to reset your password!');
                    $('.alert').removeClass('hide');
                }
            },
            close: function(e) {
                window.location.reload();
            },
            logout: function() {
                 $('.logout-account h3').html('<i class="as-icon ionicons ion-load-c fa fa-spin"></i> Logging Out...');
                 spotpop.api.users.logout();
            }
        });
    });