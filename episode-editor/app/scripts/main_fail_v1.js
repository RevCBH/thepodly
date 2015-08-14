// jshint devel:true


$(document).ready(function() {

  //create firebase reference
  var rootUrl = 'sky-jump-run.firebaseIO.com/'; 
  var myDataRef = new Firebase(rootUrl);
  
  //creates database reference to user data 
  var usersRef = myDataRef.child('users');
  var hyrp = myDataRef.child('healyourselfradio');  




 //Button click = write high level info to Firebase
  	$('#authorButton').click(function() {
       	//takes input of 'User' Field and assignes it to newUser
       	var newEpisodeNumber  = $("input[id=inputEpisodeNumber]").val();    

       	//takes input of 'Author' Field and assignes it to newAuthor
       	var newAuthor = $("input[id=inputAuthor]").val();    

		//takes input of 'Podcast Title' Field and assignes it to newepisodeName
       	var newEpisodeName = $("input[id=episodeName]").val();    



       	//creates child under /users with newEpisodeNumber
	  	hyrp.child(newEpisodeNumber).set({
	  		author: newAuthor,
	  		episodeName: newEpisodeName
  		});
    });





  //helper function updates the '.infoTest' field 
	var infoTestWrite = function(author, episodeName){
		$('.infoTest').append(
	  	"<p>" +
	    "Title: " + episodeName + "</br>" +  
    	"Author: " + author + "</br>" +
		 	
		"</p>"
	)}; 





	//Retrieve new posts as they are added to our database
	hyrp.on("child_added", function(snapshot, prevChildKey) {
	  var newPost = snapshot.val();
	  
	  //write to DOM via '.infoTest' with helper function 'infoTestWrite'
	  infoTestWrite(newPost.author, newPost.podcastName); 

	});


	

	
	//replaces userRef list when a child is updated
	hyrp.on("child_changed", function(snapshot) {
		$(".infoTest").empty(); 

		hyrp.once("value", function(snapshot) {
		 // The callback function will get called twice, once for "JonChung" and once for "CedricDahl"
		  
		  	snapshot.forEach(function(childSnapshot) {
		    // key will be "JonChung" the first time and "CedricDahl" the second time
			  
			    var key = childSnapshot.key();
			    // childData will be the actual contents of the child

			    var childData = childSnapshot.val();

			     //write to DOM via '.infoTest' with helper function 'infoTestWrite'
			     infoTestWrite(childData.author, childData.podcastName); 

		 	});
		});
	});




  
  //Attach an asynchronous callback to read the data at our posts reference
  hyrp.on("value", function(snapshot) {
	  var infoShow = snapshot.val();
	  
	  //$('.infoTest').append(infoShow); 
	  console.log(snapshot.val());
  },


  

  //Error code, appears in Console if read failed 
  function (errorObject) {
    console.log("The read failed: " + errorObject.code);

  });


  

  //Retrieve Podcast Title
  demoPodcastRef.on("value", function(snapshot) {
    var title = snapshot.val();
    
    //write to DOM via '.podcastTitleTest'
    $('.podcastTitleTest').append("<h3> " + title + "</h3>"); 

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
