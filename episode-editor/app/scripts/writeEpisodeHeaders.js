$(document).ready(function() {
//initilizing variables
    //create firebase references
    var rootUrl = 'sky-jump-run.firebaseIO.com/'; 
    var myDataRef = new Firebase(rootUrl);
    
    var episodesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/'; 
    var episodesRef = new Firebase(episodesUrl); 

    //delte : hash test 
    //var hash = window.location.hash; // Gets '#foo' from http://example.com/page.html#foo
    //console.log('hash is: '+ hash);
    

    //variable initialization 
//****** Change value of newEpisodeNumber back to '' after getting time write to work on Firebase
    var newEpisodeNumber = 22;
    var podcastUrl='';


 	console.log("hello");


    //function to write Episode Data to DOM
      var episodeInfoWrite = function(newEpisodeNumber){
        
        //2) Write to the DOM in episodeInfoAdd
        episodesRef.child(newEpisodeNumber).once("value", function(snapshot) {
          var infoShow = snapshot.val();    
          $('.episodeHeader').append(
            "<h4>" + "Episode " + newEpisodeNumber + " - " + infoShow.episodeName + "</h4>");
          
        /*3) Write to the DOM in episodeDescriptionAdd
          $('.episodeDesc').append(
            infoShow.episodeDescription);
            //console.log(snapshot.val());*/

          //4 Append Edit Button in DOM
          //$('.episodeEditButtonArea').show();
		});
    };

    episodeInfoWrite(22);



});