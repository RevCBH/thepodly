/*Notes
  This doc (main_deleteTableRow.js) does 1 thing: delete table lines in episode-editor/index.html

  How it works
    1) Spew count is found for row of id=NoteButtonEdit
    2) Spew count is used to find time
    3) Alert pops up, "are you sure you want to delete the note at Show Time XX:YY? This can't be undone. "
    4) If User OK's Alert, time key is deleted in Firebase

  The code below is seperated into 5 parts
    0) initizlize variables
    1) Retrieve Episode Number from URL
    2) Use EpisodeNumber to set variables related to episodeNumber
    3) Display Episode Header from Firebase
    4) Display Episode Table from Firebase
*/

$(document).ready(function(){
  //initilizing variables
      //create firebase references
        var rootUrl = Config.firebase.rootUrl;
        var myDataRef = new Firebase(rootUrl);

        var episodesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/';
        var episodesRef = new Firebase(episodesUrl);

      //episode specific variables
        //setting newEpisodeNumber to 000 as a base value so I can hide it till it has a non 0 value when entered
        var newEpisodeNumber = '000';

        //delte soon: just testing this
        sessionStorage.setItem('newEpisodeNumber', newEpisodeNumber);

        var newEpisodeName = '';
        var newEpisodeDescription = '';
        var podcastUrl = '';

      //initilaizing html strings to load at start

        //episode high level html
        var showEpisodeEditButton = '<button class="btn btn-default" type="submit" role="button" id="episodeEditButton">Edit Episode Info</button>';
        var enterEpisodeInfo = '<h4>Enter Episode Info</h4><div class="row"><!-- Episode # --><div class="col-xs-2"><label for="newEpisodeNum">Episode #</label><input type="text" class="form-control" id="inputEpisodeNumber" placeholder="?" ></div><!-- Episode Name --> <div class="col-xs-3"><label for="episodeName">Episode Name </label><input type="text" class="form-control" placeholder="episode name?" id="episodeNameField"></div><!-- Episode Description --><div class="col-xs-4"><label for="episodeDescription">Episode Description</label> (Optional)<input type="text" class="form-control" placeholder="" id="episodeDescription"></div><!-- Update Button --> <div class="col-xs-2"></br><label>&nbsp;</label><button type="submit" class="btn btn-default" id="submitButton">Update</button></div><!--End "row" class--> </div>';

        //podcast media
        //var showPodcastUrlForm = '<hr><h4>Enter Podcast URL</h4><form class="form-inline"><div class="form-group"><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button></div></form>'
        var showPodcastUrlForm ='<hr><h4>Enter Podcast URL</h4><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button>';
        var podcastUrlEditButton = '<button type="submit" class="btn btn-default" id="podcastUrlEditButton">Edit URL</button>';

        //episode notes
        var showEpisodeNotesHeader = '<hr><h4>Add Show Notes</h4>';




});

