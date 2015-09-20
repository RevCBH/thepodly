(function() {
  function Controller(panelId) {
    this.panelId = panelId;
    this.firebase = new Firebase(Config.firebase.rootUrl);
  }

  Controller.prototype.updateView = function(view) {
    $(this.panelId).html(view);
  };

  function useTemplateFile(templatePath, controllerClass) {
    (function() {
      this.renderTemplate = function(t) {
        return $(Handlebars.compile(t.prop('outerHTML'))(this));
      };

      this.templateLoaded = new podly.Event('templateLoaded');
      this.template = function(state) {
        var t = this.templateSet.find('[data-state=' + state + ']').clone();

        return this.renderTemplate(t);
      };

      $.get(templatePath, function (data) { // TODO - handle errors
        this.templateSet = $('<div>' + data + '</div>');
        this.templateLoaded.dispatch();
      }.bind(this));
    }.bind(controllerClass.prototype))();
  }

  podly.useTemplateFile = useTemplateFile;
  podly.Controller = Controller;
})();
