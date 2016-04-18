/*jshint -W065 */
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
    var SpotPopUser = Backbone.Model.extend({
      defaults: {
      },
      initialize: function() {
          _.bindAll(this);

      },
      register: function(params) {
        var sparams = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};

          spotpop.qb.createSession(function(err,result){
            if (!err) {
              spotpop.qb.login(sparams, function(err, user){
                if (user) {
                    spotpop.qb.users.create(params, function(err, user){
                      if (user) {
                        // success
                        $('.register-wait').addClass('hide');
                        $('.register-success').removeClass('hide');
                        
                      } else  {
                        // error
                        $('.register-error-mess').removeClass('hide');
                      }
                    });
                  }
                });
          }
        });
        
      },
      login: function(params, isFirst) {
        spotpop.qb.createSession(function(err, result){
          if (result) {
            // success
            spotpop.qb.login(params, function(err, user){
              if (user) {
                  localStorage.sp_user = JSON.stringify(user);
                  if (!isFirst) {
                    spotpop.appRouter.navigate('map', {trigger: true});
                    window.location.reload();
                  } else {
                    spotpop.appRouter.navigate('my-account', {trigger: true});
                    window.location.reload();
                  }
                  
              } else {  
                 $('.login-wait').addClass('hide');
                $('.login-error').html('<p class="orange bold">Incorrect Username or Password!</p>');
              } 
            });
          } else  {
            // error
            $('.login-wait').addClass('hide');
            $('.login-error').html('<p class="orange bold">Error establishing connection, please Try Again!</p>');
          }
        });
        
      },
      current: function() {
            if (localStorage.sp_user) {
                var user = JSON.parse(localStorage.getItem('sp_user'));
                var custom_data = {};

                if (user.custom_data) {
                  custom_data = JSON.parse(user.custom_data);
                } 

                user.custom_data = custom_data;

                return user;
            } else {
               return false;
            }
      },
      err: function() {
           if (localStorage.err) {
                return JSON.parse(localStorage.getItem('err'));
            } else {
               return false;
            }
      },
      id: function() {
            if (this.current()) {
                return this.current().id;
            } else {
               return false;
            }
            
        },
      isLogged: function(e) {
            if (this.current()) {
                return true;
            } else {
                return false;
            }
      },
      session: function() {
            if (this.isLogged()) {
                return true;
            } else {
                window.location.hash = '#login';
            }
      }, 
      logout: function() {
        localStorage.removeItem('sp_user');
        localStorage.removeItem('spot');
        localStorage.removeItem('filters');
        window.location.hash = '#login?logout=true';
        window.location.reload();
      },
      update: function(form) {
          var self = this;
          var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};

          spotpop.qb.createSession(function(err,result){
            if (!err) {
              spotpop.qb.login(params, function(err, user){
                  if (user) {
                    // success
                    if (!form) {
                       spotpop.qb.users.get(self.id(), function(err, result){
                            if (result) {
                              // success
                              localStorage.sp_user = JSON.stringify(result);
                                      location.reload();
                            } else  {
                              // error
                            }
                          });
                    } else {
                      spotpop.qb.users.update(self.id(), form, function(err, result){
                            if (result) {
                              // success
                              localStorage.sp_user = JSON.stringify(result);
                                      location.reload();
                            } else  {
                              // error
                              var detail = JSON.parse(err.detail);
                              console.log(err, detail);
                              if (detail.errors.email) {
                                $('.alert p').html('Email ' + detail.errors.email[0]);
                                $('.alert').removeClass('hide');
                              }

                              if (detail.errors.login) {
                                $('.alert p').html('Username ' + detail.errors.login[0]);
                                $('.alert').removeClass('hide');
                              }
                            }
                          });
                    }
                  } else  {
              // error
                }
              });
            }          
          });  
        },
        resetpassword: function(email) {
          var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};

          spotpop.qb.createSession(function(err,result){
            if (!err) {
              spotpop.qb.login(params, function(err, res){
                  if (res) {
                    // success
                      spotpop.qb.users.resetPassword(email, function(err, user){
                          $('.forgot-wait').addClass('hide');
                          $('.forgot-email').val('');
                          $('.forgot-error').html('<i class="as-icon ionicons ion-checkmark green"></i> Reset Link Sent');
                          $('.reset-password h3').html('<i class="as-icon ionicons ion-checkmark green"></i> Reset Link Sent');
                        if (err) {  
                          // error
                          $('.alert p').html('Password link not sent please try again!').removeClass('hide');
                        }
                      });
                    } else {
                      $('.alert p').html('Error establishing database connection, please try again!').removeClass('hide');
                    }
                  });
              } else {
                $('.alert p').html('Error establishing database connection, please try again!').removeClass('hide');
              }
            });
        },
         bug: function(bug) {
            var bugClass = "Bugs";
            var self = this;
            var id = this.current().id;
             
            var params = { 'email': "fara@shixels.com", 'password': "BwSH7q1QF7wK"};
             spotpop.qb.createSession(function(err,result){
          if (result) {
              spotpop.qb.login(params, function(err, user){
            if (user) {
            spotpop.qb.data.create(bugClass, {user_id: parseInt(id), type: 'In App Report', desc: bug}, function(err, res){
                    if (err) {
                        $('.alert p').html('Error submitting bug! Please try again');
                                $('.alert').removeClass('hide');
                    } else {

                        $('.bug-overlay').addClass('hide');
                        $('.bug-success').removeClass('hide');
                        
                      }
                  });
                } else {
                  $('.alert p').html('Error connecting to server! Please try again');
                                $('.alert').removeClass('hide');
                }
              });
                }
                else {
                  $('.alert p').html('Error connecting to server! Please try again');
                                $('.alert').removeClass('hide');
                }
              });
            }

     });
    // Returns the Model class
    return  SpotPopUser;

}

);
