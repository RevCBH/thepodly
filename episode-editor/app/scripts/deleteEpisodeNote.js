/*Notes
  This doc (delteEpisodeNote.js) deletes a specific podcast show note at a specific time in the episode editor. 
  How it works
    0) user clicks [delete] button (id = “noteButtonDelete")
    1) confirmation modal appears and prompts the user, “are you sure?” 
    3) if the user selects "yes", the table row for that note is emptied and the note for that particular time is deleted in Firebase
    

  The code below is seperated into 3 parts
    0) Initilize variables 
    1) modal on click of [delete] button (id = “noteButtonDelete")
    2) delete note row in the DOM 
    3) delete note from firebase 
    
*/

$(document).ready(function(){
//Part 0) initalize variables
  //initialize firebase variables
      var rootUrl = Config.firebase.rootUrl;
      var myDataRef = new Firebase(rootUrl);

      var episodesUrl = rootUrl+'podcasts/healyourselfradio/episodes/';
      var episodesRef = new Firebase(episodesUrl);


//part 1) modal on click of [delete] button (id = “noteButtonDelete") 
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

		    	//initilizize function that will make cellTime usable by converitng it from hh:mm:ss to seconds
		    	var hmsToSecondsOnly = function(str) {
				    var p = str.split(':'),
				        s = 0, m = 1;

				    while (p.length > 0) {
				        s += m * parseInt(p.pop(), 10);
				        m *= 60;
				    }

				    return s;
				};

		    	//Get play time directly from the 2nd <td> 
				cellTime = hmsToSecondsOnly($('#noteTimeCell_spewCount_'+spewCountMemory).html());  

				
		
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

https://cobro-dev.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes/1


//part 2) delete note row in the DOM 
	//create a funciton which takes the spewCountMemory as a param
    var deleteNoteRowInDOM = function(spewCountMemory){
    	//empty the '<tr spewcount' that coresponds with the spewCountMemory above
    	$('#spewCount_'+spewCountMemory).empty();	
    };
	

//part 3) deleteNoteInFirebase(cellTime)
	var deleteNoteInFirebase = function(cellTime){
		
    	//delete cellTime child from Firebase 
    	//test 1 = hard code (test 2 = variable based on cellTime)
    	var deleteNoteRef = new Firebase(episodesUrl+'22/episodeNotes/'+cellTime); //episodesUrl+'22/episodeNotes/'+ cellTime);
    	
		deleteNoteRef.remove();
		
	};


});

