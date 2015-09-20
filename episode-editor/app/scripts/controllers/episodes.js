(function() {
  'use strict';

  var EpisodesController = function (AuthController) {
    podly.Controller.call(this, '#episode-list-panel');
    this.AuthController = AuthController;
    this.episodes = undefined;

    this.AuthController.onLoggedIn(function(authData) {
      var userRef = this.firebase.child('users/' + authData.uid);
      userRef.on('value', function(userData) {
        this.userData = userData.val();
        var episodesRef = this.firebase.child('podcasts/' + this.userData.podcastId + '/episodes');
        episodesRef.on('value', function(data) {
          data = data.val();
          for(var k in data) {
            if(data.hasOwnProperty(k)) {
              data[k]._id = k;
            }
          }
          data = _.sortBy(data, function(x) { return x.number; });
          console.log("updating episode data:", data);
          this.updateEpisodes(data);
        }.bind(this));
      }.bind(this));

      this.updateView(this.selectView());
    }.bind(this));

    this.templateLoaded.addCallback(function() {
      this.updateView(this.selectView());

      //var episodesRef = this.podcastRef.child('episodes');
      //episodesRef.on('value', function(data) {
        //this.updateEpisodes(data.val());
      //}.bind(this));


      this.AuthController.onLoggedOut(function() {
        this.updateView(this.selectView());
      }.bind(this));
    }.bind(this));
  };

  EpisodesController.prototype = Object.create(podly.Controller.prototype);

  EpisodesController.prototype.updateEpisodes = function (newEpisodes) {
    this.episodes = newEpisodes;
    this.updateView(this.selectView());
  };

  EpisodesController.prototype.selectView = function() {
    if(this.templateSet === undefined) {
      return $("<div></div>");
    }

    if(this.AuthController.isLoggedIn) {
      if(this.episodes === undefined) {
        return this.template('loading');
      } else {
        return this.wiredListView();
      }
    } else {
      return this.template('hidden');
    }
  };

  EpisodesController.prototype.wiredListView = function() {
    var t = this.template('list');
    t.find('a#new-post-link').click(this.showNewEpisodeForm.bind(this));
    return t;
  };

  EpisodesController.prototype.showNewEpisodeForm = function() {
    var t = this.template('new');
    t.find('form').submit(function () {
      var newEpisode = this.firebase.child('podcasts/' + this.userData.podcastId + '/episodes').push();
      newEpisode.set({
        number: t.find('#newEpisodeNumber').val(),
        title: t.find('#newEpisodeTitle').val()
      });
      return false;
    }.bind(this));

    t.find('a#new-episode-cancel-button').click(function () {
      this.updateView(this.selectView());
      return false;
    }.bind(this));

    this.updateView(t);
  };

  podly.useTemplateFile('partials/episodes.html', EpisodesController);

  $(document).ready(function() {
    if(document.AuthController === undefined) {
      console.log("EpisodeController requires AuthController!");
    }

    document.EpisodesController = new EpisodesController(document.AuthController);

    document.AuthController.onLoggedIn(function(authData) {
    });

  });
})();
