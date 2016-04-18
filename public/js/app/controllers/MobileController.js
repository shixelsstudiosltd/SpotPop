define([
    'SpotPop', 
    'backbone', 
    'marionette',
    'views/SplashView',
    'views/LoginView',
    'views/RegisterView',
    'views/MapView',
    'views/NavView',
    'views/FooterView',
    'views/AddSpotView',
    'views/SpotView',
    'views/SpotNavView',
    'views/SpotFooterView',
    'views/ListView',
    'views/MyAccountView',
    'views/MySpotsView',
    'views/MyFavesView',
    'views/SearchView',
    'views/HelpView',
    'views/BugView',
    'views/AboutView',
    'views/EditSpotView',
    'views/ForgotView'
    ],
    function (
    SpotPop, 
    Backbone, 
    Marionette,
    SplashView,
    LoginView,
    RegisterView,
    MapView,
    NavView,
    FooterView,
    AddSpotView,
    SpotView,
    SpotNavView,
    SpotFooterView,
    ListView,
    MyAccountView,
    MySpotsView,
    MyFavesView,
    SearchView,
    HelpView,
    BugView,
    AboutView,
    EditSpotView,
    ForgotView
    ){
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {    
        },
        login: function() {
            if (spotpop.api.users.session()){
                window.location.hash = '#map';
            } else {
                spotpop.fullRegion.show(new LoginView());  
            }
            
        },
        register: function() {
             if (spotpop.api.users.current()){
                window.location.hash = '#map';
            } else {
                spotpop.fullRegion.show(new RegisterView());
            }
            
        },
        map: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView());
            spotpop.appRegion.show(new MapView());
            spotpop.footerRegion.show(new FooterView());
        },
        addspot: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'Add Spot'}));
            spotpop.appRegion.show(new AddSpotView());
            spotpop.footerRegion.show(new FooterView());
        },
        spot: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new SpotNavView());
            spotpop.appRegion.show(new SpotView());
            spotpop.footerRegion.show(new SpotFooterView());
        },
        list: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView());
            spotpop.appRegion.show(new ListView());
            spotpop.footerRegion.show(new FooterView());
        },
        myaccount: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'My Account'}));
            spotpop.appRegion.show(new MyAccountView());
        },
        myspots: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'My Spots'}));
            spotpop.appRegion.show(new MySpotsView());
        },
        myfaves: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'My Favourites'}));
            spotpop.appRegion.show(new MyFavesView());
        },
        search: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'Search Spots'}));
            spotpop.appRegion.show(new SearchView());
        },
        help: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'About &amp; Help'}));
            spotpop.appRegion.show(new HelpView());
        },
        about: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'About SpotPop'}));
            spotpop.appRegion.show(new AboutView());
        },
        bugs: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'Bug Report'}));
            spotpop.appRegion.show(new BugView());
        },
        editspot: function() {
            spotpop.api.users.session();
            spotpop.navRegion.show(new NavView({title: 'Edit Spot'}));
            spotpop.appRegion.show(new EditSpotView());
            spotpop.footerRegion.show(new FooterView());
        },
        forgot: function() {
            spotpop.fullRegion.show(new ForgotView());
        },
        logout: function() {
            spotpop.qb.logout(function(err, result){});
            if (spotpop.api.users.session()){
                window.location.hash = '#map';
            } else {
                spotpop.fullRegion.show(new LoginView());  
            }
        }
     });
});