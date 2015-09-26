(function() {
  // A 'base class' for setting up something with a firebase connection
  function WithFirebase() {
    //Config is the dev / prod thing we setup in .config/json. 
    //code lives in scripts/generated/config.js
    this.firebase = new Firebase(Config.firebase.rootUrl);
  }

  /* A 'base class' for Controllers
   * That means:
   *   1. It has a this.firebase property
   *   2. It has a this.panelId property which is the jQuery selector it
   *      uses to determine where on the page to render. For example:
   *      if you this.panelId is "#some-elem-id" then the **contents** of
   *      $("#some-elem-id") will be replace with whatever this controller
   *      wants.
   */
  
  //constructs common stuff for all controllers 
  function Controller(panelId) {
    WithFirebase.call(this);
    this.panelId = panelId;
  }
  
  Controller.prototype = Object.create(WithFirebase.prototype);

  /* A convenience function for setting the html of $(this.panelId) */
  Controller.prototype.updateView = function(view) {
    //this writes HTML to a specific 'panel' on the dom and is how Bennett "aims" where the html shows up
    $(this.panelId).html(view);
  };

  /* Setup a controller function to use a specific template file. It modifies
   * the controller's prototype to add the template() method and the
   * templateLoaded podly.Event which fires when the remote template file has
   * been loaded.
   *
   * Paramters:
   *    templatePath - a relative path to an .html file containing different
   *                   controller templates
   *    controllerFunction - a 'derived class' that implements Controller
   */
  function useTemplateFile(templatePath, controllerFunction) {
    (function() {
      //this does a few things
        //a) finds the outerHTML of a specific data-state
        //b) compiles with handlebars to give the complete / final html including handlebars data 
      this.renderTemplate = function(t) {
        return $(Handlebars.compile(t.prop('outerHTML'))(this));
      };

      this.templateLoaded = new podly.Event('templateLoaded');

      
      //*I think this takes in the dataState, finds the specific part and clones it so it can be used without harming the initial copy
      this.template = function(state) {
        var t = this.templateSet.find('[data-state=' + state + ']').clone();

        return this.renderTemplate(t);
      };

      $.get(templatePath, function (data) { // TODO - handle errors
      //* I think this defines a jQuery element that gets used to analize templatePath 
        this.templateSet = $('<div>' + data + '</div>');
        this.templateLoaded.dispatch();
      }.bind(this));
    }.bind(controllerFunction.prototype))();
  }

  podly.useTemplateFile = useTemplateFile;
  podly.Controller = Controller;
  podly.Firebase = WithFirebase;
})();




































