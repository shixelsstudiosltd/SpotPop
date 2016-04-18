define(['jquery', 'hbs!templates/bugs', 'backbone','models/Model', 'marionette'],
    function ($, template, Backbone, Model) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            model: null,
            events: {
                'click .submit-bug': 'submit',
                'click .close-button': 'close',
                'click .done-bug': 'done'
            },
            initialize: function(options) {    
                this.model = new Model();
            },
            onRender: function () {
             spotpop.api.core.cleanView(this, true, true); // gets view ready to be rendered    
            },
             close: function() {
                $('.alert').addClass('hide');
            },
            submit: function() {
                var bug = $(".bug").val();

                if (bug) {
                    $('.bug-overlay').removeClass('hide');
                    spotpop.api.users.bug(bug);
                } else {
                    $('.alert p').html('Please enter issue!');
                    $('.alert').removeClass('hide');
                }
            },
            done: function(e) {
                e.preventDefault();
                window.location.reload();
            }
        });
    });