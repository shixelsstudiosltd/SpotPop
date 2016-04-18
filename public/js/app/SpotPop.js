define([
    'jquery', 
    'backbone', 
    'marionette', 
    'underscore', 
    'handlebars',
    'moment',
    'models/SpotPopCore',
    'models/SpotPopWifi',
    'models/SpotPopUser',
    'quickblox'
    ],
    function (
    $, 
    Backbone, 
    Marionette, 
    _, 
    Handlebars,
    moment,
    SpotPopCore,
    SpotPopWifi,
    SpotPopUser,
    QuickBlox
    ){
        var SpotPop, spotpop;
        SpotPop  = spotpop = window.SpotPop = window.spotpop = new Backbone.Marionette.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        
        spotpop.mobile = isMobile();
        spotpop.api = {}; 
        spotpop.api.core = new SpotPopCore();
        spotpop.api.wifi = new SpotPopWifi();
        spotpop.api.users = new SpotPopUser();
        spotpop.moment = moment;
        spotpop.api.url = 'https://api.quickblox.com';
        spotpop.api.bucket = 'qbprod';


       
 
        spotpop.qb = QuickBlox;

         spotpop.qb.creds = {
          appId: 38845,
          authKey: 'g-a9pDt-ULq2gpS',
          authSecret: 'Yf2ufTMPuAkr8SA',
          key: '9HCMWeVpQtrWR3ype5t7'
        };

        spotpop.qb.init( spotpop.qb.creds.appId,  spotpop.qb.creds.authKey,  spotpop.qb.creds.authSecret);
       
       
        spotpop.addRegions({
            appRegion:"#main-body-container",
            footerRegion: "#main-footer-container",
            navRegion: "#main-nav-container",
            fullRegion: "#page"
        });


        spotpop.addInitializer(function () {
            Backbone.history.start();
        });

        
        return SpotPop;
    });