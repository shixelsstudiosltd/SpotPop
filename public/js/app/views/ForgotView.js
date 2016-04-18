define(['jquery', 'hbs!templates/forgot', 'backbone','models/Model', 'marionette'],
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
            var email = $('.forgot-email').val();

            if (email) {
                $('.forgot-wait').removeClass('hide');
                spotpop.api.users.resetpassword(email);
            }  else {
                $('.forgot-error').html('<p class="orange bold">Please Fill in Email!</p>');
            }
        }
    });
});