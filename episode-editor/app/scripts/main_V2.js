//test write Episode Number to DB

// jshint devel:true


$(document).ready(function() {

  //initilizing variables
    //create firebase references
    var rootUrl = 'sky-jump-run.firebaseIO.com/'; 
    var myDataRef = new Firebase(rootUrl);
    
    var episodesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/'; 
    var episodesRef = new Firebase(episodesUrl); 

    /*Setting newEpisodeNumber to 000 becuase I'm lazy and 
    don't yet want to write needed functionality 
    to determine if episode info has been written yet.
    will neeed to replace this eventually with a more thoughtful solution
    */
    var newEpisodeNumber = "000";
    
    //(delete next wipe) creates database reference to healyourselfradio 
    var usersRef = myDataRef.child('users');
    var healyourselfradio = myDataRef.child('healyourselfradio');  


//Button click = update high level info to /episodes
    $('#submitButton').click(function(){
        //takes input of 'Episode Number' field and assignes it to newEpisodeNumber
        newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();    


        //takes input of 'Episode Name' Field and assignes it to newPodcastTitle
        var newEpisodeName = $("input[id=episodeNameField]").val();    
        
        
        //takes input of 'Episode Description' Field and assignes it to newAuthor
        var newEpisodeDescription=$("input[id=episodeDescription]").val();    


        //creates child under /users with newUserName
        var eRef = episodesRef.child(newEpisodeNumber);
        eRef.set({
          episodeName: newEpisodeName, 
          episodeDescription: newEpisodeDescription, 
          episodeNotes: ''
        });
    });
      

//writing from Firebase
  
  /*helper function updates the '.infoTest' field 
  	var episodeInfoWrite = function(name, description){
  		$('.episodeInfoAdd').append(
  	  	episodeName + episodeDescription
  	)}; 
  */

  /*Currently being coppied | Retrieve new posts as they are added to our database
    episodesRef.child("11").on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    //write to DOM via '.infoTest' with helper function 'infoTestWrite'
    episodeInfoWrite(newPost.episodeName, newPost.episodeDescription); 
    });	
  */

  //Currently being copied, delete original when done | Attach an asynchronous callback to read the data at our posts reference
  episodesRef.child(newEpisodeNumber).on("value", function(snapshot) {
    var infoShow = snapshot.val();    
    //$('.episodeInfoAdd').append(infoShow); 
    
    //episodeInfoWrite(infoShow.episodeName, infoShow.episodeDescription); 
    //**** //Test the code below, if it works de-bug the code above
    $('.episodeInfoAdd').append(
      "Episode " + newEpisodeNumber + " - " + infoShow.episodeName );
    $('.episodeDescriptionAdd').append(
      infoShow.episodeDescription);
    


    console.log(snapshot.val());
  },
  //Error code, appears in Console if read failed 
  function (errorObject) {
    console.log("The read failed: " + errorObject.code);

  });


  /*Currently being coppied | Retrieve new posts as they are added to our database
	episodesRef.on("child_added", function(snapshot, prevChildKey) {
	  var newPost = snapshot.val();
	  //write to DOM via '.infoTest' with helper function 'infoTestWrite'
	  episodeInfoAdd(newPost.author, newPost.podcastName); 

	});
	*/

	
	//replaces notes list when a child is updated
	usersRef.on("child_changed", function(snapshot) {
		$(".infoTest").empty(); 

		usersRef.once("value", function(snapshot) {
		 // The callback function will get called twice, once for "JonChung" and once for "CedricDahl"
		  
		  	snapshot.forEach(function(childSnapshot) {
		    // key will be "JonChung" the first time and "CedricDahl" the second time
			  
			    var key = childSnapshot.key();
			    // childData will be the actual contents of the child

			    var childData = childSnapshot.val();

			     //write to DOM via '.infoTest' with helper function 'infoTestWrite'
			     episodeInfoWrite(childData.author, childData.podcastName); 

		 	});
		});
	});



//End brakets / pares / ;   
});






$(document).ready(function() {

  
  // Setup Bootstrap tab handlers for the navigation pills in
  // the page header
  $('#header-nav li a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
