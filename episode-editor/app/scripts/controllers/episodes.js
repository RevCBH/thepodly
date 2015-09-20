(function() {
  'use strict';

  /* Convert the episodes object from firebase to the format we want and
   * then sort them by episode number*/
  function parseEpisodesObject(episodes) {
    return _.chain(episodes)
      .pairs() // this turns the object into an array of [id, data]
      .map(function(x) { x[1]._id = x[0]; return x[1]; })
      .sortBy(function(x) { return x.number; })
      .value();
  }

  /* A podcast model 'class'. Given the id of a podcast, it will load the data
   * for that podcast from firebase and trigger the updatedEvent whenever that
   * data changes.
   */
  var Podcast = function(id) {
    podly.Firebase.call(this);
    this._id = id;
    this.updatedEvent = new podly.Event('updated');

    this.ref = this.firebase.child('podcasts/' + this._id);
    this.ref.on('value', function(data) {
      data = data.val();
      this.title = data.title;
      this.episodes = parseEpisodesObject(data.episodes);
      this.updatedEvent.dispatch(this);
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

  /* A controller for the list of episodes in a podcast.
   * It takes the AuthController as a construtor argument because it uses the
   * account information to determine which podcast a user owns. The episode
   * list and episode creation button won't show up until a user is logged in.
   */
  var EpisodesController = function (AuthController) {
    podly.Controller.call(this, '#episode-list-panel');
    this.AuthController = AuthController;
    this.pinnedState = undefined;

    // When the user logs in, get their profile information and create a
    // podcast object for their podcast.
    this.AuthController.onLoggedIn(function(authData) {
      var userRef = this.firebase.child('users/' + authData.uid);
      userRef.on('value', function(userData) {
        this.userData = userData.val();
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
