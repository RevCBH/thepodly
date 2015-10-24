//This doc notes.js is used to display Episode Notes and Add them 

//first we're  writing some random thing to index.html at showNotesPanel

(function() {
  'use strict';

  //to call use new NotesList(episodeID)
  var NotesList = function(id) {
    // Setup the this.firebase variable using the Firebase() function in controller.js
    podly.Firebase.call(this);
    this._id = id;
    //compare to Podcast() in episodes.js

    // create a firebase reference to the notes for the episode identified by this._id
    console.log('getting showNotes/' + this._id);
    this.ref = this.firebase.child('showNotes/' + this._id);
    
    //for podly.Event see controller.js where a bunch of functions have been defined
    this.updatedEvent = new podly.Event('updated');
    
    this.ref.on('value', function(data) {
      this.notes = data.val(); 
      console.log('episode notes:', data.val());
      console.log('notifing ' + this.updatedEvent.callbacks.length + ' watchers');
      this.updatedEvent.dispatch(this);

    }.bind(this));
  };

  var NotesController = function(EpisodesController) {
    //do the controller setup for the object we're making 
    podly.Controller.call(this, '#showNotesPanel');
    this.EpisodesController = EpisodesController

    //this is like a click handler
    this.templateLoaded.addCallback(function() {
      this.updateView(this.template('hidden'));
    }.bind(this)); 

    this.EpisodesController.episodeSelectedEvent.addCallback(function(episodeId) {
      // Display the loading state before we start waiting for firebase
      this.updateView(this.template('loading'));
      // Create a NotesList object to get the notes for the active episode
      this.notesList = new NotesList(episodeId);
      this.notesList.updatedEvent.addCallback(function () {
        var t = this.template('listOfShit');
        this.updateView(t);
      }.bind(this));
    }.bind(this));
  };

  //Copy over basic stuff from teh controller prototype
  NotesController.prototype = Object.create(podly.Controller.prototype);

  podly.useTemplateFile('partials/notes.html', NotesController);

  $(document).ready(function() {
    if(document.EpisodesController === undefined) {
      throw "NotesController requires EpisodesController!";
    }

    document.NotesController = new NotesController(document.EpisodesController);
  });

})();
