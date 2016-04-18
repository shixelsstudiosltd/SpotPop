// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["SpotPop", "jquery", "routers/AppRouter", "controllers/MobileController", "backbone", "marionette", "jquerymobile", "backbone.validateAll"],
    function (SpotPop, $, AppRouter, AppController) {
        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        SpotPop.appRouter = new AppRouter({
            controller:new AppController()
        });

        SpotPop.start();
    });