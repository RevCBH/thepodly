(function() {
  'use strict';

  // Controller for login/logout
  var AuthController = function () {
    this.ref = new Firebase(Config.firebase.rootUrl);
    this.panelId = '#auth-panel';

    this.loggedInEvent = new podly.Event('loggedIn');
    this.loggedOutEvent = new podly.Event('loggedOut');

    this.onLoggedIn(this.showLogoutLink.bind(this));
    this.onLoggedOut(this.showLoginLink.bind(this));

    this.templateLoaded.addCallback(function() {
      this.ref.onAuth(function(authData) {
        if (authData) {
          this.authData = authData;
          this.loggedInEvent.dispatch(authData);
        } else {
          this.authData = null;
          this.loggedOutEvent.dispatch();
        }
      }.bind(this));
    }.bind(this));
  };

  AuthController.prototype.onLoggedIn = function(cb) {
    this.loggedInEvent.addCallback(cb);
  };

  AuthController.prototype.onLoggedOut = function(cb) {
    this.loggedOutEvent.addCallback(cb);
  };

  AuthController.prototype.updateView = function(view) {
    $(this.panelId).html(view);
  };

  AuthController.prototype.showLogoutLink = function() {
    var template = this.template('logout');
    template.click(function() {
      this.ref.unauth();
    }.bind(this));

    this.updateView(template);
  };

  AuthController.prototype.showLoginForm = function() {
    var template = this.template('loginForm');

    template.submit(function (e) {
      this.updateView(this.template('loading'));

      this.ref.authWithPassword({
        email: template.find('#loginEmail').val(),
        password: template.find('#loginPassword').val()
      }, function(err, data) {
        if (err) {
          this.updateView($(this.template('error')));
          setTimeout(this.showLoginForm.bind(this), 3000);
        }
      }.bind(this));

      return false;
    }.bind(this));

    this.updateView(template);
  };

  AuthController.prototype.showLoginLink = function() {
    var template = this.template('login');
    template.click(this.showLoginForm.bind(this));

    this.updateView(template);
  };

  podly.useTemplate.bind(AuthController.prototype)('partials/auth.html');

  $(document).ready(function() {
    document.AuthController = new AuthController();
  });
})();
