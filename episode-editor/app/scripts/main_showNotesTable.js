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

podlyGlobal.showNotesTable = function(){  

//Part 0) initilizing variables
    /*delete old firebase ref
	    //create firebase references
	    var rootUrl = Config.firebase.rootUrl;
	    var myDataRef = new Firebase(rootUrl);

	    var episodesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/';
	    var episodesRef = new Firebase(episodesUrl);

	    var episode22NotesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/22/episodeNotes';
	  	var episode22NotesRef = new Firebase(episode22NotesUrl);
	  */
	var ref1 = podlyGlobal.episodesUrl + newEpisodeNumber + '/episodeNotes'; 
	var ref2 = new Firebase(ref1);
	//delete | var ref3 = podlyGlobal.episodesUrl + newEpisodeNumber; 


    //delete, now uisng global variable | var newEpisodeNumber = '22';

    //table html
    var tableTop = '<table id="myTable" class="table table-hover"> <caption>Show Notes for Episode ' + newEpisodeNumber +  '</caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>words</th> <th>url</th><th>delete</th></thead>';
    	//update & edit headers were temporarily cut out <th>update</th><th>edit</th>
    var tableBot ='</tbody></table>';  

    var count = 0;

    //initilize spewCounter which we'll use to create key references to each row's ID's
    var spewCounter = 0;

//Part 0b) initilize functions


	//Turn childSnapshot.key() [episode time in seconds] into xx:yy:zz format so that table shows times in clock format instead of seconds
		//here's how this will work 
		//1) childSnapshot.key() runs through a function that converts it into xx:yy:zz format 
	var secondsToHms = function(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); }; 
		//2) call the function directly from the 'create rows in table' code below


	var reverseChronology = function (){
		var fb = new Firebase(ref1);

			// listen for all changes and update
			fb.endAt().limitToFirst(1000).on('value', update);

			// print the output of our array
			function update(snap) {
			   var list = [];
			    snap.forEach(function(ss) {
			       var data = ss.val();
			       data['.priority'] = ss.getPriority();
			       data['.key'] = ss.key();
			       list.unshift(data); 
			    });
			   // prep to print results
				
				$('.spewTime').empty(); 
			  	//add table header 
				$('.spewTime').prepend(tableTop);

			//check results 
				
				//itterate throgh the list and print 1) Time, 2) words, 3) url 
				var i; 
				for (i=0; i<list.length; i++){
				console.log(list[i][".key"] + '    ' + list[i].noteWords + '    ' + list[i].noteUrl);
				
				//spew count increment 
				spewCounter++; 

				//class toggle (even = info, odd = )
			  	if(spewCounter%2==0){
			  		var classToggle = 'info';
			  	}else{
			  		classToggle = '';
			  	}

			  	//printed table 
			  	//create rows in the table
				var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell" spewCount="'+spewCounter+'"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell_spewCount_'+spewCounter+'">' + secondsToHms(list[i][".key"]) + '</td> <td id="noteWordsCell">' + list[i].noteWords + '</td> <td id="noteUrlCell">' + list[i].noteUrl + '</td><td><!-- Standard button --> <button type="button" class="btn btn-default" id="noteButtonDelete" spewCount="'+spewCounter+'">Delete</button></td> </div> </tr>';

				//insert tableGuts var into
				$("#myTable").find('tbody').append($(tableGuts));	
				}		

				//test to see if this is getting executed once or multiple times	    
			    console.log('count is '+count); 
			    count=count+1; 
		};	
		
		//table close (bottom)
		$("#myTable").find('tbody').append($(tableBot));	  	

		//re-load #mainCss to re-style page
		$("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));
	};

	//Part X) Organise the data in to a table		
	//can delete | just here for reference
	var standardChronology = function(){
		//1st we load the table data (middle of table) from firebase

		

		ref2.on("value", function(snapshot) {
			$('.spewTime').empty(); 
		  	//add table header 
			$('.spewTime').prepend(tableTop);

		  

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
		  	
		 

		  	//create rows in the table
			var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell" spewCount="'+spewCounter+'"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell_spewCount_'+spewCounter+'">' + secondsToHms(childSnapshot.key()) + '</td> <td id="noteWordsCell">' + childSnapshot.val().noteWords + '</td> <td id="noteUrlCell">' + childSnapshot.val().noteUrl + '</td><td><!-- Standard button --> <button type="button" class="btn btn-default" id="noteButtonDelete" spewCount="'+spewCounter+'">Delete</button></td> </div> </tr>';
		  	//edit button which was cut out of the table guts above, add back in | ' + /* <td id="noteButtonAreaCell"> <!-- Standard button --> <button type="button" class="btn btn-default" id="TablenoteButtonEdit">Edit</button> </td>*/ + '
		  	//edit_v2 & update buttons <td><!-- Standard button --> <button type="button" class="btn btn-default" id="tableNoteButtonUpdate" spewCount="'+spewCounter+'">Update</button></td><td><!-- Standard button --> <button type="button" class="btn btn-default" id="tableNoteButtonEdit" spewCount="'+spewCounter+'">Edit</button></td>

		  	//insert tableGuts var into DOM
		  	$("#myTable").find('tbody').append($(tableGuts));	 

		  //iterate through table with spew counter and hide all update buttons 
		  	//Hide Update Button after it's appended (above)
		    //$('#tableNoteButtonUpdate').hide();  

		    /*delete test to see if this is getting executed once or multiple times	    
			    console.log('count is '+count); 
			    count=count+1; 
			*/
		  });	  
		  	

		  	//table close (bottom)
			$("#myTable").find('tbody').append($(tableBot));	  	

		
		  //re-load #mainCss to re-style page
		  $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));
		  
		  

		});	
	};

//Part 1) starting functions
	//runs old way of making the table work (earliest time to latest)
	// can delete  | temp block out | standardChronology(); 
	
	//test if there are show notes, if there are, show them, if not, do nothing
	ref2.on('value', function(snapshot) {
		console.log('test value is: ' + snapshot.val());
		var exists = (snapshot.val() !== null);
		if (exists){
			//displays episode notes in referense choronology 
			reverseChronology(); 
		}else{
			console.log('shit dont exist');
		}
		
	});
		
 };


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
