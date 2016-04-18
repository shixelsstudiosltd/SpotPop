define(['jquery', 'hbs!templates/register', 'backbone','models/Model', 'marionette'],
function ($, template, Backbone, Model) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
        template:template,
        model: null,
        regform: null,
        events: {
            'click .signin-toggle': 'gotosignin',
            'click .signup-button': 'signup',
            'click .done-button': 'signin'
        },
        initialize: function(options) {                
        },
        onRender: function () {
         spotpop.api.core.cleanView(this); // gets view ready to be rendered 
         
        },
        gotosignin: function(e) {
            spotpop.appRouter.navigate('login', {trigger: true});
        },
        signup: function(e) {
            this.regform = spotpop.api.core.getFormObj('.register-form');

            if (this.regform.login && this.regform.password && (this.regform.password === this.regform.rpassword) && (this.regform.password.length > 8)) {
                $('.register-wait').removeClass('hide');
                this.regform = {
                    login: this.regform.login,
                    password: this.regform.password
                };
                spotpop.api.users.register(this.regform);
            } else if (this.regform.password !== this.regform.rpassword) {
                $('.register-error').html('<p class="orange bold">Passwords must match!</p>');
            } else if (this.regform.password.length < 8) {
                $('.register-error').html('<p class="orange bold">Password must be at least 8 characters!</p>');
            } else {
                $('.register-error').html('<p class="orange bold">Please Fill in all fields!</p>');
            }
        },
        signin: function(e) {
            $('.register-success').addClass('hide');
            $('.register-login-wait').removeClass('hide');
            spotpop.api.users.login(this.regform, true);
        }
    });
});