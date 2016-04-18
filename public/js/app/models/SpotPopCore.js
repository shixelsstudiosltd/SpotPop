define([
    "jquery",
    "underscore",
    "backbone"
    ],
    function(
    $,
    _,
    Backbone
    ){
    // Creates a new Backbone Model class object
    var SpotPopCore = Backbone.Model.extend({
      defaults: {
      },
      initialize: function() {
          _.bindAll(this);

      },
      cleanView: function(view, hide_footer, hide_search) {
          view.$el = view.$el.children(); // get rid of that pesky wrapping-div
          view.setElement(view.$el);  // assumes 1 child element.
          setTimeout(function() {
                $('.nav-menu').css('width', '0');
                $('.nav-menu a').hide();
                $('.nav-menu').removeClass('open');
                $('#main-body-container').css('left', '0');
            
          }, 0); 

          if (hide_search) {
            $('.nav-search').hide();
          }
          if (hide_footer) {
            $('.footer-view').hide();
          }
      },
      getFormObj: function(form) {
        var formObj = {};
        var inputs = $(form).serializeArray();
        $.each(inputs, function (i, input) {
            formObj[input.name] = input.value;
        });
        return formObj;
      },
      isEmail: function(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      },
      dynamicSort: function(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
      },
      truncate: function(text, maxLength) {
        return (text.length > maxLength) ? text.substr(0,maxLength-1)+'&hellip;' : text;
      }

       });

    // Returns the Model class
    return  SpotPopCore;

}

);
