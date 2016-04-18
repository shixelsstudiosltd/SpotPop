define(['backbone', 'marionette'], function(Backbone, Marionette) {
   return Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
         "": "index",
         "login": "login",
         "register": "register",
         "map": "map",
         "add-spot": "addspot",
         "spot": "spot",
         "list": "list",
         "my-account": "myaccount",
         "my-spots": "myspots",
         "my-faves": "myfaves",
         "search": "search",
         "help": "help",
         "about": "about",
         "bugs": "bugs",
         "edit-spot": "editspot",
         "forgot-password": "forgot"
       }
   });
});