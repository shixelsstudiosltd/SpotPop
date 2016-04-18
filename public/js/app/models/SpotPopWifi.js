/*jshint -W065 */
/*jshint -W083 */
define([
    "jquery",
    "underscore",
    "backbone",
    "views/SpotListView"

    ],
    function(
    $,
    _,
    Backbone,
    SpotListView
    ){
    // Creates a new Backbone Model class object
    var SpotPopWifi = Backbone.Model.extend({
      defaults: {
      },
      country: null,
      initialize: function() {
          _.bindAll(this);

      },
      addspot: function(spot) {
        var spotClass = "Spots";
        var custom_data = spotpop.api.users.current().custom_data;
        var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
        if (!custom_data) {
          custom_data = {};
        } 

        if (!custom_data.spots) {
          custom_data.spots = [];
        } 

        spotpop.qb.createSession(function(err, result){
            if (result) {
              spotpop.qb.login(params, function(err,user){
                  if (user) {
                      spotpop.qb.data.create(spotClass, spot, function(err, res){
                        if (err) {
                            alert('error adding spot! - ' + JSON.stringify(err));
                        } else {
                            custom_data.spots.push(res.id);
                            spotpop.qb.users.update(spotpop.api.users.current().id, {custom_data: JSON.stringify(custom_data)}, function(err2, user){
                              if (user) {
                                // success 
                                $('.add-wait').addClass('hide');
                                $('.add-success').removeClass('hide');
                              } else  {
                                // error 
                                alert('error saving spot to user! - ' + JSON.stringify(err2));
                              }
                            });
                        }
                    });
                  }
              });
            }
        });
        
      },
      savespot: function(spot) {
        var spotClass = "Spots";
        var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};

        spotpop.qb.createSession(function(err, result){
            if (result) {
              spotpop.qb.login(params, function(err,user){
                  if (user) {
                      spotpop.qb.data.update(spotClass, spot, function(err, res){
                        if (err) {
                            alert('error adding spot! - ' + JSON.stringify(err));
                        } else {
                                $('.add-wait').addClass('hide');
                                $('.add-success').removeClass('hide');
                        }
                    });
                  }
              });
            }
        });
        
      },
      shownearspots: function() {

          var spotsClass = "Spots";
          var filter = {sort_asc: 'created_at'};
          var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
          var marker_icon = 'marker.png';
          var position_icon = 'position.png';
          var self = this;
          var markers = [];
          spotpop.qb.createSession(function(err, result){
            if (result) {
              spotpop.qb.login(params, function(err,user){
                  if (user) {
                    spotpop.qb.data.list(spotsClass, filter, function(err, result){
                        if (err) { 
                            console.log(err);
                        } else {
                            var spots = result.items;

                            
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(function(position) {
                                var geolocation = {
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude
                                };
                                
                                var map = new google.maps.Map(document.getElementById('spotpop-map'), {
                                    center: {lat: position.coords.latitude, lng: position.coords.longitude},
                                    scrollwheel: true,
                                    zoom: 14
                                  });

                                var loc_marker = new google.maps.Marker({
                                  map: map,
                                  position: geolocation,
                                  animation: google.maps.Animation.DROP,
                                  icon: position_icon
                                });

                                 for (var scount = 0; scount < spots.length; scount++) {
                                  var spot = spots[scount];
                                  var spot_location = {lat: 0, lng: 0};

                                  if (spot.location && spot.location[0]) {
                                     spot_location = {lat: spot.location[0], lng: spot.location[1]};
                                  }
                                  markers[scount] = new google.maps.Marker(
                                  {
                                      map: map,
                                      position: spot_location,
                                      animation: google.maps.Animation.DROP,
                                      icon: marker_icon,
                                      spot: spot
                                    });

                                    google.maps.event.addListener(markers[scount], 'click', function() {
                                        localStorage.spot = JSON.stringify(this.spot);
                                        spotpop.appRouter.navigate('spot', {trigger: true});
                                    }); 
                                }

                                $('.refresh-map').removeClass('fa fa-spin');
                              });


                            }
                              
                        }
                    });
                  }
                });
            }
          });
  
      },
      shownearaddress: function(near_lat, near_long) {

          var spotsClass = "Spots";
          var filter = {sort_asc: 'created_at'};
          var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
          var marker_icon = 'marker.png';
          var position_icon = 'position.png';
          var self = this;
          var markers = [];
          spotpop.qb.createSession(function(err, result){
            if (result) {
              spotpop.qb.login(params, function(err,user){
                  if (user) {
                    spotpop.qb.data.list(spotsClass, filter, function(err, result){
                        if (err) { 
                            console.log(err);
                        } else {
                            var spots = result.items;

                            
                                var geolocation = {
                                  lat: near_lat,
                                  lng: near_long
                                };
                                
                                var map = new google.maps.Map(document.getElementById('spotpop-map'), {
                                    center: {lat: near_lat, lng: near_long},
                                    scrollwheel: true,
                                    zoom: 14
                                  });

                                var loc_marker = new google.maps.Marker({
                                  map: map,
                                  position: geolocation,
                                  animation: google.maps.Animation.DROP,
                                  icon: position_icon
                                });

                                 for (var scount = 0; scount < spots.length; scount++) {
                                  var spot = spots[scount];
                                  var spot_location = {lat: 0, lng: 0};

                                  if (spot.location && spot.location[0]) {
                                     spot_location = {lat: spot.location[0], lng: spot.location[1]};
                                  }
                                  markers[scount] = new google.maps.Marker(
                                  {
                                      map: map,
                                      position: spot_location,
                                      animation: google.maps.Animation.DROP,
                                      icon: marker_icon,
                                      spot: spot
                                    });

                                    google.maps.event.addListener(markers[scount], 'click', function() {
                                        localStorage.spot = JSON.stringify(this.spot);
                                        spotpop.appRouter.navigate('spot', {trigger: true});
                                    }); 
                                }                            
                              
                        }
                    });
                  }
                });
            }
          });
  
      },
      shownearlist: function(where) {

          var spotsClass = "Spots";
          var filter = {sort_asc: 'created_at'};
          var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
          var self = this;
          spotpop.qb.createSession(function(err, result){
            if (result) {
              spotpop.qb.login(params, function(err,user){
                  if (user) {
                    spotpop.qb.data.list(spotsClass, filter, function(err, result){
                        if (err) { 
                            console.log(err);
                        } else {
                            var spots = result.items;
                            $(where).html('');
                            for (var scount = 0; scount < spots.length; scount++) {
                                  var spot = spots[scount];
                                  var spot_location = {lat: 0, lng: 0};

                                  if (spot.location && spot.location[0]) {
                                     spot_location = {lat: spot.location[0], lng: spot.location[1]};
                                  }
                                  
                                  var spotlist = new SpotListView({spot: spot});

                                    $(where).prepend(spotlist.render().el);
                                    $('.refresh-list').removeClass('fa fa-spin');

                            }
                              
                        }
                    });
                  }
                });
            }
          });
  
      },
      showmyspots: function(where) {

          var spotsClass = "Spots";
          var filter = {sort_asc: 'created_at', 'owner': spotpop.api.users.id()};
          var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
          var self = this;
          spotpop.qb.createSession(function(err, result){
            if (result) {
              spotpop.qb.login(params, function(err,user){
                  if (user) {
                    spotpop.qb.data.list(spotsClass, filter, function(err, result){
                        if (err) { 
                            console.log(err);
                        } else {
                            var spots = result.items;
                            $(where).html('');
                            for (var scount = 0; scount < spots.length; scount++) {
                                  var spot = spots[scount];
                                  var spot_location = {lat: spot.location[0], lng: spot.location[1]};
                                  var spotlist = new SpotListView({spot: spot});

                                    $(where).prepend(spotlist.render().el);
                                    $('.refresh-spots').removeClass('fa fa-spin');

                            }
                              
                        }
                    });
                  }
                });
            }
          });
  
      },
      popit: function(spot) {
        var spotClass = "Spots";
        var param = { '_id': spot, 'inc': { 'pops': 1 }};
        var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
        var self = this;
        spotpop.qb.createSession(function(err, result){
          if (result) {
            spotpop.qb.login(params, function(err,user){
                if (user) {
                  spotpop.qb.data.update(spotClass, param, function(err, res){
                      if (err) {
                        $('.pop-it i').addClass('ion-alert-circled').removeClass('ion-load-c fa fa-spin');
                      } else {
                          $('.pop-it i').addClass('ion-checkmark').removeClass('ion-load-c fa fa-spin');
                          var total = res.stops + res.pops;

                          if (total > 0) {
                            res.pop_rating = ((parseInt(res.pops) / parseInt(total)) * 100).toFixed(2) + '%';
                            res.stop_rating =((parseInt(res.stops) / parseInt(total)) * 100).toFixed(2)  + '%';

                            $('.stop-rating-p').html(res.stop_rating);
                            $('.pop-rating-p').html(res.pop_rating);
                          }
                          
                      }
                  });
                }
              });
            }
          });
            
    },
    stopit: function(spot) {
       var spotClass = "Spots";
        var param = {_id: spot, inc: {stops: 1}};
        var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
        var self = this;
        spotpop.qb.createSession(function(err, result){
          if (result) {
            spotpop.qb.login(params, function(err,user){
                if (user) {
                  spotpop.qb.data.update(spotClass, param, function(err, res){
                      if (err) {
                        $('.stop-it i').addClass('ion-alert-circled').removeClass('ion-load-c fa fa-spin');
                      } else {
                          $('.stop-it i').addClass('ion-checkmark').removeClass('ion-load-c fa fa-spin');
                          var total = res.stops + res.pops;

                          if (total > 0) {
                            res.pop_rating = ((parseInt(res.pops) / parseInt(total)) * 100).toFixed(2) + '%';
                            res.stop_rating =((parseInt(res.stops) / parseInt(total)) * 100).toFixed(2) + '%';

                            $('.stop-rating-p').html(res.stop_rating);
                            $('.pop-rating-p').html(res.pop_rating);
                          }
                      }
                  });
                }
              });
            }
          });
    },
    like: function(spot) {
        var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
        var self = this;
        var custom_data = spotpop.api.users.current().custom_data;

        if (!custom_data) {
          custom_data = {};
        }

        if (!custom_data.likes) {
          custom_data.likes = [];
        }

        custom_data.likes.push(spot);

        spotpop.qb.createSession(function(err, result){
          if (result) {
            spotpop.qb.login(params, function(err,user){
                if (user) {
                  spotpop.qb.users.update(spotpop.api.users.id(), {custom_data: JSON.stringify(custom_data)}, function(err, res){
                      if (err) {
                        $('.like-spot').addClass('ion-alert-circled').removeClass('ion-load-c fa fa-spin');
                      } else {
                          spotpop.api.users.update();
                      }
                  });
                }
              });
            } else {
              $('.like-spot').addClass('ion-alert-circled').removeClass('ion-load-c fa fa-spin');
            }
          });
            
    },
    unlike: function(spot) {
       var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
        var self = this;
        var custom_data = spotpop.api.users.current().custom_data;
        var new_likes = [];

        if (!custom_data) {
          custom_data = {};
        }

        if (!custom_data.likes) {
          custom_data.likes = [];
        }

        for (var lcount = 0; lcount < custom_data.likes.length; lcount++) {
          if (custom_data.likes[lcount] !== spot) {
            new_likes.push(custom_data.likes[lcount]);
          }
        }

        custom_data.likes = new_likes;

        spotpop.qb.createSession(function(err, result){
          if (result) {
            spotpop.qb.login(params, function(err,user){
                if (user) {
                  spotpop.qb.users.update(spotpop.api.users.id(), {custom_data: JSON.stringify(custom_data)}, function(err, res){
                      if (err) {
                        $('.like-spot').addClass('ion-alert-circled').removeClass('ion-load-c fa fa-spin');
                      } else {
                         spotpop.api.users.update();
                      }
                  });
                }
              });
            } else {
              $('.like-spot').addClass('ion-alert-circled').removeClass('ion-load-c fa fa-spin');
            }
          });
    },
    showmyfaves: function(where) {
      var spotsClass = "Spots";
      var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
      var self = this;
      var filter = null;
      var custom_data = spotpop.api.users.current().custom_data;

      if (!custom_data) {
        custom_data = {};
      }

      if (!custom_data.likes) {
        custom_data.likes = [];
      }
      

      
      
        spotpop.qb.createSession(function(err, result){
          if (result) {
            spotpop.qb.login(params, function(err,user){
                if (user) {
                  $(where).html('');
                  for (var fcount = 0; fcount < custom_data.likes.length; fcount++) {
                    filter = {'_id': custom_data.likes[fcount]};
                    spotpop.qb.data.list(spotsClass, filter, function(err, result){
                        if (err) { 
                            console.log(err);
                        } else {
                            var spot = result.items[0];
                            var spot_location = {lat: spot.location[0], lng: spot.location[1]};
                            var spotlist = new SpotListView({spot: spot});
                            
                            $(where).prepend(spotlist.render().el);
                            $('.refresh-faves').removeClass('fa fa-spin'); 
                        }
                         });

                        }
                   
                  }
                });
              }
            });
          },
    search: function(term, where, type) {
      var spotsClass = "Spots";
      var filter = null;
      var filter2 = null;

      if (type === 'mine') {
        filter = {sort_asc: 'created_at', 'owner': spotpop.api.users.id(), business: {ctn: term}};
        filter2 = {sort_asc: 'created_at', 'owner': spotpop.api.users.id(), ssid: {ctn: term}};
      }

      if (type === 'all') {
        filter = {sort_asc: 'created_at', business: {ctn: term}};
        filter2 = {sort_asc: 'created_at', ssid: {ctn: term}};
      }

      if (type === 'faves') {
        filter = {sort_asc: 'created_at', business: {ctn: term}};
        filter2 = {sort_asc: 'created_at', ssid: {ctn: term}};
      }
      
      
      var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
      var self = this;
      spotpop.qb.createSession(function(err, result){
        if (result) {
          spotpop.qb.login(params, function(err,user){
              if (user) {
                spotpop.qb.data.list(spotsClass, filter, function(err, result){
                    if (err) { 
                        console.log(err);
                    } else {
                        var spots = result.items;
                        $(where).html('');
                        if (spots.length > 0) {
                          for (var scount = 0; scount < spots.length; scount++) {
                                var spot = spots[scount];
                                var spot_location = {lat: spot.location[0], lng: spot.location[1]};
                                var spotlist = new SpotListView({spot: spot});
                                if (type === 'faves' && spotpop.api.users.current().custom_data && spotpop.api.users.current().custom_data.likes) {
                                    var likes = spotpop.api.users.current().custom_data.likes;
                                    for (var fcount = 0; fcount < likes.length; fcount++) {
                                      if (likes[fcount] === spot._id) {
                                        $(where).prepend(spotlist.render().el);
                                      }
                                    }
                                } else {

                                      $(where).prepend(spotlist.render().el);
                                     
                                }
                               
                                $('.refresh-spots').removeClass('fa fa-spin');
                          }
                        } else {
                        
                          spotpop.qb.data.list(spotsClass, filter2, function(err, result2){
                              if (err) { 
                                  console.log(err);
                              } else {
                                  var spots2 = result2.items;
                                  $(where).html('');
                                  if (spots2.length > 0) {
                                    for (var scount = 0; scount < spots2.length; scount++) {
                                          var spot2 = spots2[scount];
                                          var spot_location = {lat: spot2.location[0], lng: spot2.location[1]};
                                          var spotlist = new SpotListView({spot: spot2});

                                            $(where).prepend(spotlist.render().el);
                                            $('.refresh-spots').removeClass('fa fa-spin');

                                    }
                                  } 
                                      
                              }
                          });
                        }
                            
                    }
                });
              }
            });
        }
      });
    }


    
  });

    // Returns the Model class
    return  SpotPopWifi;

}

);
