/*Notes
  This doc (main_showNotesTable.js) does 1 thing: writes the table of show notes for the episode editor 

  How it works
    1) Table data is loaded for middle of the table 
    2) Table guts are printed
    3) Table top is put on top
   

  The code below is seperated into 2 parts
    0) initizlize variables
    1) organize data into a table
    
 Related files are
 	1) deleteEpisodeNote.js (deletes rows of the table when the 'delete' [Button] is clicked
 	2) main_editTableRow.js (not yet written as of 21-Sept-15) it will allow in-line editing of rows 

 *Episode Variable
 	Also we'll need to add some sort current episode vairable in as a universal  to replace the episode number
*/

$(document).ready(function() {

//Part 0) initilizing variables
    //create firebase references
    var rootUrl = Config.firebase.rootUrl;
    var myDataRef = new Firebase(rootUrl);

    var episodesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/';
    var episodesRef = new Firebase(episodesUrl);

    var episode22NotesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/22/episodeNotes';
  	var episode22NotesRef = new Firebase(episode22NotesUrl);

    var newEpisodeNumber = '22';

    //table html
    var tableTop = '<table id="myTable" class="table table-hover"> <caption>Show Notes for Episode ' + newEpisodeNumber +  '</caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>words</th> <th>url</th><th>update</th><th>edit</th><th>delete</th></thead>';
    var tableBot ='</tbody></table>';    

    var count = 0;

//Part 1) Organise the data in to a table	
	
	//1st we load the table data (middle of table) from firebase
	var ref2 = new Firebase(rootUrl + 'podcasts/healyourselfradio/episodes/22/episodeNotes');
	ref2.on("value", function(snapshot) {
		$('.spewTime').empty(); 
	  	//add table header 
		$('.spewTime').prepend(tableTop);


	  //initilize spewCounter which we'll use to create key references to each row's ID's
	  var spewCounter = 0;

	  //runs through the DB and writes a table row in the episode editor for each show note
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
	  	
	  	//Turn childSnapshot.key() [episode time in seconds] into xx:yy:zz format so that table shows times in clock format instead of seconds
	  		//here's how this will work 
	  		//1) childSnapshot.key() runs through a function that converts it into xx:yy:zz format 
			var secondsToHms = function(d) {
				d = Number(d);
				var h = Math.floor(d / 3600);
				var m = Math.floor(d % 3600 / 60);
				var s = Math.floor(d % 3600 % 60);
				return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); }
			//2) call the function directly from the 'create rows in table' code below


	  	//create rows in the table
		var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell" spewCount="'+spewCounter+'"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell_spewCount_'+spewCounter+'">' + secondsToHms(childSnapshot.key()) + '</td> <td id="noteWordsCell">' + childSnapshot.val().noteWords + '</td> <td id="noteUrlCell">' + childSnapshot.val().noteUrl + '</td><td><!-- Standard button --> <button type="button" class="btn btn-default" id="tableNoteButtonUpdate" spewCount="'+spewCounter+'">Update</button></td><td><!-- Standard button --> <button type="button" class="btn btn-default" id="tableNoteButtonEdit" spewCount="'+spewCounter+'">Edit</button></td><td><!-- Standard button --> <button type="button" class="btn btn-default" id="noteButtonDelete" spewCount="'+spewCounter+'">Delete</button></td> </div> </tr>';
	  	//edit button which was cut out of the table guts above, add back in | ' + /* <td id="noteButtonAreaCell"> <!-- Standard button --> <button type="button" class="btn btn-default" id="TablenoteButtonEdit">Edit</button> </td>*/ + '
	  	

	  	$("#myTable").find('tbody').append($(tableGuts));	 

	  //iterate through table with spew counter and hide all update buttons 
	  	//Hide Update Button after it's appended (above)
	    $('#tableNoteButtonUpdate').hide();  

	    //test to see if this is getting executed once or multiple times	    
	    console.log('count is '+count); 
	    count=count+1; 

	  });	  
	  	

	  	//table close (bottom)
		$("#myTable").find('tbody').append($(tableBot));	  	

	
	  //re-load #mainCss to re-style page
	  $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));
	  
	  

	});	


// Test 5: Make rows editable O.O  (sooooon)
		



    });


// Completed tests, saving for reference |  Test 1: Spew out all the data from Firebase on https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes
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
