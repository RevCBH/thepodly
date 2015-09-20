(function() {
  'use strict';

  var NotesList = function(id) {
  };

  var NotesController = function(EpisodesController) {
  };

  podly.useTemplateFile('partials/notes.html', NotesController);

  $(document).ready(function() {
    if(document.EpisodesController === undefined) {
      throw "NotesController requires EpisodesController!";
    }

    document.NotesController = new NotesController(document.EpisodesController);
  });

})();
