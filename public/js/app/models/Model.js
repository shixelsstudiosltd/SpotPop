define([
    "jquery", 
    "backbone"
    ],
    function(
    $, 
    Backbone
    ){
    // Creates a new Backbone Model class object
    var Model = Backbone.Model.extend({
        // Default values for all of the Model attributes
        defaults: {
        },
        // Model Constructor
        initialize: function(options) {
        },
        // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {

        }

    });

    // Returns the Model class
    return Model;

    }

);