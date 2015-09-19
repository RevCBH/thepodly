(function() {
  function useTemplate(templatePath) {
    this.templateLoaded = new podly.Event('templateLoaded');
    this.template = function(state) {
      return this.templateSet.find('[data-state=' + state + ']').clone();
    };

    $.get(templatePath, function (data) { // TODO - handle errors
      this.templateSet = $('<div>' + data + '</div>');
      this.templateLoaded.dispatch();
    }.bind(this));
  }

  podly.useTemplate = useTemplate;
})();
