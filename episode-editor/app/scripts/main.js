// jshint devel:true


$(document).ready(function() {

  //create firebase reference
  var rootUrl = 'sky-jump-run.firebaseIO.com/';
  var myDataRef = new Firebase(rootUrl);

  //creates database reference to healyourselfradio
  var usersRef = myDataRef.child('users');
  var healyourselfradio = myDataRef.child('healyourselfradio');






  /*saving user objects
  usersRef.set({
  	JonChung: {
  		author: 'Jon Chung',
  		podcastName: 'Heal Yourself Radio'
  	},
  	CedricDahl: {
  		author: 'Cedric Dahl',
  		podcastName: 'Future Phone'
  	}

  });





  //add a user object
  usersRef.update({
  	NewUserTest: {
  		author: 'New User Name',
  		podcastName: 'Podcast Namerino'
  	}
  });
  */






 //Button click = write author name to Firebase
  	$('#authorButton').click(function() {
       	//takes input of 'User' Field and assignes it to newUser
       	var newUserName  = $("input[id=inputUser]").val();

       	//takes input of 'Author' Field and assignes it to newAuthor
       	var newAuthor = $("input[id=inputAuthor]").val();

		//takes input of 'Podcast Title' Field and assignes it to newPodcastTitle
       	var newPodcastTitle = $("input[id=podcastTitle]").val();



       	//creates child under /users with newUserName
	  	usersRef.child(newUserName).set({
	  		author: newAuthor,
	  		podcastName: newPodcastTitle
  		});
    });




  //helper function updates the '.infoTest' field
	var infoTestWrite = function(author, podcastName){
		$('.infoTest').append(
	  	"<p>" +
	  	"Author: " + author + "</br>" +
		"Title: " + podcastName + "</br>" +
		"</p>"
	)};

	//Retrieve new posts as they are added to our database
	usersRef.on("child_added", function(snapshot, prevChildKey) {
	  var newPost = snapshot.val();

	  //write to DOM via '.infoTest' with helper function 'infoTestWrite'
	  infoTestWrite(newPost.author, newPost.podcastName);

	});



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
			     infoTestWrite(childData.author, childData.podcastName);

		 	});
		});
	});




  //Attach an asynchronous callback to read the data at our posts reference
  usersRef.on("value", function(snapshot) {
	  var infoShow = snapshot.val();

	  //$('.infoTest').append(infoShow);
	  console.log(snapshot.val());
  },


  //Error code, appears in Console if read failed
  function (errorObject) {
    console.log("The read failed: " + errorObject.code);

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
