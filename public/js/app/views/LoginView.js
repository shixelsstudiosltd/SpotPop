define(['jquery', 'hbs!templates/login', 'backbone','models/Model', 'marionette'],
function ($, template, Backbone, Model) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
        template:template,
        model: null,
        loginform: null,
        events: {
            'click .signup-toggle': 'signup',
            'click .signin-button': 'signin'
        },
        initialize: function(options) {                
        },
        onRender: function () {
         spotpop.api.core.cleanView(this); // gets view ready to be rendered 
         
        },
        signup: function(e) {
            spotpop.appRouter.navigate('register', {trigger: true});
        },
        signin: function(e) {
            this.loginform = spotpop.api.core.getFormObj('.login-form');

            if (this.loginform.login && this.loginform.password) {
                $('.login-wait').removeClass('hide');
                this.loginform = {
                    login: this.loginform.login,
                    password: this.loginform.password
                };
                spotpop.api.users.login(this.loginform);
            }  else {
                $('.login-error').html('<p class="orange bold">Please Fill in all fields!</p>');
            }
        }
    });
});