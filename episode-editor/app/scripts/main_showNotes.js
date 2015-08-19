$(document).ready(function() {

//initilizing variables
    //create firebase references
    var rootUrl = 'sky-jump-run.firebaseIO.com/'; 
    var myDataRef = new Firebase(rootUrl);
    
    var episodesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/'; 
    var episodesRef = new Firebase(episodesUrl); 

    //variable initialization 
    var newEpisodeNumber = '';
    var podcastUrl='';
    
    //Button clicks

      //[Button] Submit Episode Info (click) = gets Episode number
      $('#submitButton').on('click', function() {
        //get Episode Number from input form and set it here
        newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();

      });


      //[Button] Podcast URL (click) = pull player URL from DOM and add player into Show notes
      $('#podcastUrlButton').click(function(){
          //takes input of 'Podcast URL' field and assignes it to newPodcastUrl
          podcastUrl=$("input[id=podcastUrlField]").val();   

          //show Episode Notes Section 
          $('.showEpisodeNotes').show();
          
          //show podcast URL
          $('.showEpisodeNotes').append('<audio controls type="audio/mpg" name="media" id="audioPlayer" width="480"><source src="' + podcastUrl + '" type="audio/mpeg" preload = "auto"></audio>');

          //onload="document.getElementById('audioPlayer').play(); document.getElementById('audioPlayer').currentTime=0"

      });
});