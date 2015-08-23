$(document).ready(function() {

//initilizing variables
    //create firebase references
    var rootUrl = 'sky-jump-run.firebaseIO.com/'; 
    var myDataRef = new Firebase(rootUrl);
    
    var episodesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/'; 
    var episodesRef = new Firebase(episodesUrl); 

    var episode22NotesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes';
	var episode22NotesRef = new Firebase(episode22NotesUrl);     

    var newEpisodeNumber = '22'; 

    //table html
    var tableTop = '<table id="myTable" class="table table-hover"> <caption>Show Notes for Episode ' + newEpisodeNumber +  '</caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>words</th> <th>url</th><th>&nbsp;</th></thead>';
    var tableBot ='</tbody></table>';
    //var tableGuts = '<tr class = "info"> <div class="row"> <td id="notePlayButtonCell"> <span class="glyphicon glyphicon-play" aria-hidden="true"></span> </td> <td id="noteTimeCell"> <input type="text" class="form-control" id="noteTimeInput" placeholder="time"> <div class="noteTimeContainer"></div> </td> <td id="noteWordsCell"> <input type="text" class="form-control" id="noteWordsInput" placeholder="words"> <div class="noteWordsContainer"></div> </td> <td id="noteUrlCell"> <input type="text" class="form-control" id="noteUrlInput" placeholder="url"> <div class="noteUrlContainer"></div> </td> <td id="noteButtonAreaCell"> <!-- Standard button --> <button type="button" class="btn btn-default" id="noteButtonEnter">Enter</button> <button type="button" class="btn btn-default" id="noteButtonEdit">Edit</button> </td> </div> </tr> ';
    
// Test 1: Spew out all the data from Firebase on https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes		
	/*/ Test 1b: Order data by time 
	var ref2 = new Firebase("https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes");
	ref2.orderByKey().on("child_added", function(snapshot) {
	  $('.spewTime').append(snapshot.key() + '</br>' + snapshot.val().noteWords + '</br>' + snapshot.val().noteUrl + '<p></p><p></p>'); 
	});
	//*/

	/*/Test 1c: Update the list in realtime by using on.'value' insted of on.'child'
	var ref2 = new Firebase("https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes");
	ref2.on("value", function(snapshot) {
		$('.spewTime').empty(); 
	  snapshot.forEach(function(childSnapshot) {
	  	$('.spewTime').append(childSnapshot.key() + '</br>' + childSnapshot.val().noteWords + '</br>' + childSnapshot.val().noteUrl + '<p></p><p></p>'); 
	  });	  
	});	
	//*/

// Test 2: Organise the data in to a table	
	
	//1st we load the table data (middle of table) from firebase
	var ref2 = new Firebase("https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes");
	ref2.on("value", function(snapshot) {
		$('.spewTime').empty(); 
	  	//add table header 
		$('.spewTime').prepend(tableTop);


	  //initilize spewCounter which we'll use to create key references to each row's ID's
	  var spewCounter = 0;

	  snapshot.forEach(function(childSnapshot) {
	  	
	  	spewCounter++; 
	  	
	  	//Hidden reference | simple Firebase code
	  	//$('.spewTime').append(spewCounter + ') ' + childSnapshot.key() + '</br>' + childSnapshot.val().noteWords + '</br>' + childSnapshot.val().noteUrl + '<p></p><p></p>'); 

	  	//class toggle (even = info, odd = )
	  	if(spewCounter%2==0){
	  		var classToggle = 'info';
	  	}else{
	  		classToggle = '';
	  	}
	  	
	  	//create rows in the table
	  	var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell">' + childSnapshot.key() + '</td> <td id="noteWordsCell">' + childSnapshot.val().noteWords + '</td> <td id="noteUrlCell">' + childSnapshot.val().noteUrl + '</td> <td id="noteButtonAreaCell"> <!-- Standard button --> <button type="button" class="btn btn-default" id="noteButtonEdit">Edit</button> </td> </div> </tr>';
	  	$("#myTable").find('tbody').append($(tableGuts));	  		
	  });	  
	  	

	  	//table close (bottom)
		$("#myTable").find('tbody').append($(tableBot));	  	

	
	  //re-load #mainCss to re-style page
	  $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));
	  

	});	

// Test 4: hook up row play button to media O.O 
	//(see main_showNotesPlayButton.js)


// Test 5: Make rows editable O.O 



    });