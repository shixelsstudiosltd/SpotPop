// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["SpotPop", "routers/AppRouter", "controllers/DesktopController", "jquery", "backbone", "marionette", "jqueryui", "bootstrap", "backbone.validateAll"],
    function (SpotPop, AppRouter, AppController) {
        SpotPop.appRouter = new AppRouter({
            controller:new AppController()
        });
        // Start Marionette Application in desktop mode (default)
        SpotPop.start();

    });