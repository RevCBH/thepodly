(function() {
  'use strict';

  // Prototype for an event dispatcher
  function Event(name) {
    this.name = name;
    this.callbacks = [];
  }

  Event.prototype.addCallback = function(cb) {
    this.callbacks.push(cb);
  };

  Event.prototype.dispatch = function(eventArgs) {
    this.callbacks.forEach(function(cb) {
      cb(eventArgs);
    });
  };

  function useTemplate(templatePath) {
    //this.templatePath = templatePath;
    this.templateLoaded = new Event('templateLoaded');
    this.template = function(state) {
      return this.templateSet.find('[data-state=' + state + ']').clone();
    };

    $.get(templatePath, function (data) { // TODO - handle errors
      this.templateSet = $('<div>' + data + '</div>');
      console.log('logout state:', this.template('logout'));
      this.templateLoaded.dispatch();
    }.bind(this));
  }

  // Controller for login/logout
  var AuthController = function () {
    this.ref = new Firebase(Config.firebase.rootUrl);
    this.panelId = '#auth-panel';

    this.loggedInEvent = new Event('loggedIn');
    this.loggedOutEvent = new Event('loggedOut');

    this.onLoggedIn(this.showLogoutLink.bind(this));
    this.onLoggedOut(this.showLoginLink.bind(this));

    this.templateLoaded.addCallback(function() {
      this.ref.onAuth(function(authData) {
        if (authData) {
          this.authData = authData;
          this.loggedInEvent.dispatch(authData);
        } else {
          console.log("User is logged out");
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

  useTemplate.bind(AuthController.prototype)('partials/auth.html');

  $(document).ready(function() {
    document.AuthController = new AuthController();
  });
})();
