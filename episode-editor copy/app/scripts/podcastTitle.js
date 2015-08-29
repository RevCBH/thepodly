
$(document).ready(function() {

  //create firebase reference
  var titleUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/podcastTitle'; 
  var podcastTitle = new Firebase(titleUrl);
  
 //Retrieve Podcast Title
  podcastTitle.on("value", function(snapshot) {
    var title = snapshot.val();
    
    //write to DOM via '.podcastTitleTest'
    $('.podcastTitleTest').append("<h3> " + title + "</h3>"); 

    });


});




