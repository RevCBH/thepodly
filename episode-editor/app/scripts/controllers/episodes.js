(function() {
  //don't worry about 'use strict;' it will have console wine if you do silly things
  'use strict';

  /* Ben: Convert the episodes object from firebase to the format we want and
   * then sort them by episode number*/
    /* Ced: takes all items under episodes and converts it into an array, where each item in the array has the ID as part of it */
    //this is used only in this file, whenever data updates
    //purpose: make usable ordered array which is easier to use
  function parseEpisodesObject(episodes) {
    //_(underscorejs) is a neat library, check it out
    //_chain means we're doing a bunch of operations in a row using hte underscorejs library
    //. = method cals and here we have a 'pipeline' of actions happening which end at value()
    return _.chain(episodes)
      .pairs() // this turns the object into an array of [id, data] (data IS a js object)
      //maps is part of underscore
      //x takes each row in the array which resulted from pairs()
      .map(function(x) { x[1]._id = x[0]; return x[1]; })
      //.sortBy sorts the array by the episode number in it
      .sortBy(function(x) { return x.number; })
      //.value runs the pipeline
      .value();
  }

  /* A podcast model 'class'. Given the id of a podcast, it will load the meta-data
   * for that podcast from firebase and trigger the updatedEvent whenever that
   * data changes.
   * Good for reading, not yet for editing, but you should put editing stuff here
   */
  
  //this is setting up a constructor for a Podcast Object
  var Podcast = function(id) {
    //see 'podly = {};' on index.html, podly is a global variable defined on index.html
    //anything in podly is a global variable :o
    //.Firebase is defined scripts/lib/controller.js 
      //(this pulls the URL out of config and creates a this.firebase) 
      //('this.' is usually the current object (but no always))
      //.call 
    podly.Firebase.call(this);
    //id gets 'id' taken into the Podcast() function
    this._id = id;
    //for podly.Event see controller.js where a bunch of functions have been defined
    this.updatedEvent = new podly.Event('updated');

    this.ref = this.firebase.child('podcasts/' + this._id);
    this.ref.on('value', function(data) {
      data = data.val();
      if(data && data.title) {
        this.title = data.title;
        this.episodes = parseEpisodesObject(data.episodes);
        //this lets other parts of the program know when something has ben updated
        //.dispatch() defined in controller.j
        this.updatedEvent.dispatch(this);
      }
    }.bind(this));
  };

  // Convenience method for adding a function to call when the podcast data
  // updates.
  Podcast.prototype.onUpdated = function(cb) {
    this.updatedEvent.addCallback(cb);
  };

  /* Given an episode's id, delete it.
   * When it actually gets deleted from firebase, it will end up triggering
   * the updatedEvent.
   * TODO - delete notes for that episode too!
   */
  Podcast.prototype.deleteEpisode = function(episodeId) {
    this.ref.child('episodes/' + episodeId).remove();
  };

  Podcast.createNewPodcast = function(firebase, userRef) {
    var newPodcast = {
      ownerId: userRef.key(),
      title: "Untitled Podcast"
    };

    var newPodcastRef = firebase.child('podcasts').push(newPodcast, function(err) {
      if(err) {
        //TODO - handle error
      } else {
        console.log('new podcast id:', newPodcastRef.key());
        var podcastKey = newPodcastRef.key();
        userRef.child('podcastId').set(podcastKey);
      }
    });
  };

  /* A controller for the list of episodes in a podcast.
   * It takes the AuthController as a construtor argument because it uses the
   * account information to determine which podcast a user owns. The episode
   * list and episode creation button won't show up until a user is logged in.
   */
  var EpisodesController = function (AuthController) {
    podly.Controller.call(this, '#episode-list-panel');
    this.AuthController = AuthController;
    this.pinnedState = undefined;
    this.episodeSelectedEvent = new podly.Event('episodeSelected');

    // When the user logs in, get their profile information and create a
    // podcast object for their podcast.
    this.AuthController.onLoggedIn(function(authData) {
      var userRef = this.firebase.child('users/' + authData.uid);
      userRef.on('value', function(userData) {
        this.userData = userData.val();
        if(!this.userData.podcastId) {
          Podcast.createNewPodcast(this.firebase, userRef);
        }
        this.podcast = new Podcast(this.userData.podcastId);
        this.podcast.onUpdated(function () {
          this.updateView();
        }.bind(this));
      }.bind(this));

      this.updateView();
    }.bind(this));

    // When the user logs out, update the view
    this.AuthController.onLoggedOut(function() {
      this.updateView();
    }.bind(this));

    // When we load the remote template, go to the current view
    this.templateLoaded.addCallback(function() {
      this.updateView();
    }.bind(this));
  };
  EpisodesController.prototype = Object.create(podly.Controller.prototype);

  /* Chose the current thing to render and then render it. If a view is
   * provided as an argument, assume that's the one to render.
   *
   * Otherwise:
   *   - If our templates haven't loaded yet, render an empty div
   *   - If we're not logged in, render the 'hidden' state
   *   - If we don't have episodes loaded yet, render the 'loading' state
   *   - Otherwise, render the episode list
   *
   * TODO - if the list of episodes updates while we're trying to create a new
   *        episode, the control will switch back to the list view and any
   *        pending changes will be lost!
   */
  EpisodesController.prototype.updateView = function(t) {
    if(t === undefined) {
      if(this.templateSet === undefined) {
        t = $("<div></div>");
      }

      if(this.AuthController.isLoggedIn) {
        if(this.pinnedState == 'new') {
          return; // if the new episode form is open, don't do anything
        } else if (this.pinnedState == 'collapsed') {
          t = this.wireCollapsedView();
        } else if(this.podcast === undefined || this.podcast.episodes === undefined) {
          t = this.template('loading');
        } else {
          t = this.wireListView();
        }
      } else {
        t = this.template('hidden');
      }
    }
    return podly.Controller.prototype.updateView.call(this, t);
  };

  /* Create an episode list view and wire up all of the event handlers for
   * elements of the view. Specifically:
   *   - the new post link should switch us to the form for a new episode
   *   - the x delete links should delete the episode
   *     TODO - have delete display a confirmation modal
   *   - TODO - the episode title should load the appropriate episode in the
   *            editor and probably collapse the episodes list (which would
   *            be a new display state)
   */
  EpisodesController.prototype.wireListView = function() {
    var t = this.template('list');
    var podcast = this.podcast;
    t.find('a#new-post-link').click(this.showNewEpisodeForm.bind(this));
    t.find('a.edit-episode').click(function() {
      var episodeId = $(this).attr('data-episodeId');
      document.EpisodesController.selectEpisodeToEdit(episodeId);
      return false;
    });
    t.find('a.delete-episode').click(function () {
      var episodeId = $(this).attr('data-episodeId');
      podcast.deleteEpisode(episodeId);
      return false;
    });
    return t;
  };

  EpisodesController.prototype.wireCollapsedView = function() {
    var t = this.template('collapsed');
    t.find('a#expand-episode-list').click(function () {
      delete this.pinnedState;
      this.updateView();
      return false;
    }.bind(this));
    return t;
  };

  EpisodesController.prototype.selectEpisodeToEdit = function(episodeId) {
    this.currentEpisode = _.find(this.podcast.episodes,
                                 function(x) { return x._id == episodeId; });
    this.pinnedState = 'collapsed';
    this.episodeSelectedEvent.dispatch(episodeId);
    this.updateView();
  };

  /* Wire events for and render the new episode form */
  EpisodesController.prototype.showNewEpisodeForm = function() {
    var t = this.template('new');
    this.pinnedState = 'new';

    t.find('form').submit(function () {
      delete this.pinnedState;
      var newEpisode = this.firebase.child('podcasts/' + this.userData.podcastId + '/episodes').push();
      newEpisode.set({
        number: t.find('#newEpisodeNumber').val(),
        title: t.find('#newEpisodeTitle').val()
      });
      return false;
    }.bind(this));

    t.find('a#new-episode-cancel-button').click(function () {
      delete this.pinnedState;
      this.updateView();
      return false;
    }.bind(this));

    this.updateView(t);
  };

  podly.useTemplateFile('partials/episodes.html', EpisodesController);

  $(document).ready(function() {
    // document.AuthController should be available before we try to setup the
    // EpisodesController
    if(document.AuthController === undefined) {
      throw "EpisodeController requires AuthController!";
    }

    document.EpisodesController = new EpisodesController(document.AuthController);
  });
})();
