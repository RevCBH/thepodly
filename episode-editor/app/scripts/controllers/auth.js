(function() {
  'use strict';

  /* This is the controler which manages login/logout state and updates the
   * appropriate parts of the view. Specifically, it renders inside of the
   * #auth-panel element.
   *
   * It has the onLoggedIn and onLoggedOut methods. Any function passed to
   * them will be called when the appropriate event happens. Additionally,
   * there's the idLoggedIn property, which will be true or false depending
   * on whether or not a user is logged in.
   */
  var AuthController = function () {
    // call the Controller constructor
    podly.Controller.call(this, '#auth-panel');

    this.loggedInEvent = new podly.Event('loggedIn');
    this.loggedOutEvent = new podly.Event('loggedOut');
    this.isLoggedIn = false;

    this.onLoggedIn(this.showLogoutLink.bind(this));
    this.onLoggedOut(this.showLoginLink.bind(this));

    // When we load a template, setup the firebase
    // auth callback
    this.templateLoaded.addCallback(function() {
      this.firebase.onAuth(function(authData) {
        if (authData) {
          this.authData = authData;
          this.isLoggedIn = true;
          this.loggedInEvent.dispatch(authData);
        } else {
          this.authData = null;
          this.isLoggedIn = false;
          this.loggedOutEvent.dispatch();
        }
      }.bind(this));
    }.bind(this));
  };
  // Copy the AuthController prototype from the Controller prototype
  AuthController.prototype = Object.create(podly.Controller.prototype);

  // Convenience method to add a callback to the loggedInEvent
  AuthController.prototype.onLoggedIn = function(cb) {
    this.loggedInEvent.addCallback(cb);
  };

  // Convenience method to add a callback to the loggedOutEvent
  AuthController.prototype.onLoggedOut = function(cb) {
    this.loggedOutEvent.addCallback(cb);
  };

  // Render the logout state and setup event handling on it
  AuthController.prototype.showLogoutLink = function() {
    var template = this.template('logout');
    template.click(function() {
      this.firebase.unauth();
    }.bind(this));

    this.updateView(template);
  };

  // Render the login form and setup event handling on it
  AuthController.prototype.showLoginForm = function() {
    var template = this.template('loginForm');

    template.submit(function (e) {
      // On submit, switch to the loading view
      this.updateView(this.template('loading'));

      // Then try to login to firebase
      this.firebase.authWithPassword({
        email: template.find('#loginEmail').val(),
        password: template.find('#loginPassword').val()
      }, function(err) {
        if (err) {
          // if login fails, display an error for 3 seconds then switch back
          // to the login form view
          this.updateView($(this.template('error')));
          setTimeout(this.showLoginForm.bind(this), 3000);
        }
      }.bind(this));

      // returning false prevents the form from actually submitting
      return false;
    }.bind(this));

    this.updateView(template);
  };

  // Render the login link and setup event handling
  AuthController.prototype.showLoginLink = function() {
    var template = this.template('login');
    template.click(this.showLoginForm.bind(this));

    this.updateView(template);
  };

  podly.useTemplateFile('partials/auth.html', AuthController);

  $(document).ready(function() {
    document.AuthController = new AuthController();
  });
})();
