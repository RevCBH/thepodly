/*Notes
  This doc (main_timeConversion.js) converts user entered (formated as xx:yy:zz) into seconds, which are used as keys for show notes in Firebase 
  
  How it works
    0) when a user enteres show notes they are converted to seconds and stored in the database that way
    1) error handling if a users enters something unusable, the input field goes red and an error appears above it. 
    
    
  The code below is seperated into X parts
    0) Initilize variables 
    1) time is found in the table, as it's found it's converted from seconds to xx:yy format
    =
    2) *** Later we do the conversion when people enter their time text too *** 
    
*/

$(document).ready(function(){
//Part 0) initalize variables
	/* Delete 
	  //initialize firebase variables
	      var rootUrl = 'sky-jump-run.firebaseIO.com/';
	      var myDataRef = new Firebase(rootUrl);

	      var episodesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/';
	      var episodesRef = new Firebase(episodesUrl);
	*/


//part 1) time is found in the table, as it's found it's converted from seconds to xx:yy format
	function hmsToSecondsOnly(str) {
	    var p = str.split(':'),
	        s = 0, m = 1;

	    while (p.length > 0) {
	        s += m * parseInt(p.pop(), 10);
	        m *= 60;
	    }

	    return s;
	}




/*
	
	//(use event deligation to listen for this button being clicked and then activate)
    $('div').on('click', '#noteButtonDelete', function(){
		//event.stopPropagation() limits the number of times the alert pops up, without it the alert would show 5 times :P 
		event.stopPropagation();

		//ask user if they're REALLY sure they want to delete this particular note
		var txt;
		var r = confirm('Are you sure you want to delete this note?'); 
		if (r == true) {
		    txt = "User chose to delete a note after the prompt";

	    //code to delete row
		    //grab line count via 'spewCount' of event
		    var spewCountMemory =  $(this).attr('spewCount');	

		    //use spewCountMemory to figure out the play time from the 2nd <td> in the row
		    	//initialize cellTime
		    	var cellTime;

		    	//Get play time directly from the 2nd <td> 
				cellTime = $('#noteTimeCell_spewCount_'+spewCountMemory).html();  
		
				//test for finite
				if(isFinite(cellTime)){
					//tests, can delete: console.log('its Finite!'); //console.log('the time is' + cellTime);
				}else{
					//if notFinite turn into seconds
					cellTime = moment.duration(cellTime).asSeconds();
					console.log('it wasnt Finite, but its been fixed!');
					console.log('the time is' + cellTime);						
				}
					

	    //then we'll clear the row by calling deleteNoteRow()
	    	deleteNoteRowInDOM(spewCountMemory);

	    //use cellTime to delete the item from Firebase
	    	deleteNoteInFirebase(cellTime);

			    

		} else {
		    txt = "User chose not to delete a note after the prompt";
		}
		
	});


//part 2) delete note row in the DOM 
	//create a funciton which takes the spewCountMemory as a param
    var deleteNoteRowInDOM = function(spewCountMemory){
    	//empty the '<tr spewcount' that coresponds with the spewCountMemory above
    	$('#spewCount_'+spewCountMemory).empty();	
    };
	

//part 3) deleteNoteInFirebase(cellTime)
	var deleteNoteInFirebase = function(cellTime){
		//test with console.log
    	console.log('cellTime to delete from Firebase is ' + cellTime);

    	//delete cellTime child from Firebase 
    	//test 1 = hard code (test 2 = variable based on cellTime)
    	var deleteNoteRef = new Firebase('https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes/'+ cellTime);
    	
		deleteNoteRef.remove();
		

	};

*/
});

