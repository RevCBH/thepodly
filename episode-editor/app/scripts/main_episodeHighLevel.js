/* This doc, main_episodeHighLevel.js collects name/ep number 
 * and sets the global variables for both
 */ 


podlyGlobal.episodeHighLevel = function(){

//delete | test to confirm doc is loading
console.log("episodeHighLevel is loading :)");

//Part 0) initialize variables & functions

	//Part 0a) initialize variables
		//episode high level html
	        var newEpisodeName = '';
	        var showEpisodeEditButton = '<button class="btn btn-default" type="submit" role="button" id="episodeEditButton">Edit Episode Info</button>';
	        var enterEpisodeInfo = '<h4>Enter Episode Info</h4><div class="row"><!-- Episode # --><div class="col-xs-2"><label for="newEpisodeNum">Episode #</label><input type="text" class="form-control" id="inputEpisodeNumber" placeholder="?" ></div><!-- Episode Name --> <div class="col-xs-3"><label for="episodeName">Episode Name </label><input type="text" class="form-control" placeholder="episode name?" id="episodeNameField"></div><!-- Update Button --> <div class="col-xs-2"></br><label>&nbsp;</label><button type="submit" class="btn btn-default" id="submitButton">Update</button></div><!--End "row" class--> </div>';
        	//delete: Cut <!-- Episode Description --><div class="col-xs-4"><label for="episodeDescription">Episode Description</label> (Optional)<input type="text" class="form-control" placeholder="" id="episodeDescription"></div>
        	//episode notes
      		var showEpisodeNotesHeader = '<hr><h4>Add Show Notes</h4>';
          var lastEpisodeNumber; 

          

    //Part 0b)initialize functions 
	
      //function confirming user wants to wipe old episode; 
      function episodeExistsCallback(newEpisodeNumber, exists){
      //function either returns 'true (write) the episode or false (don't write) 
   			console.log("if(exists) is about to run, exists is "+ exists);

           	if (exists){
           	  console.log("if(exists) is running!");
           	  //function either returns 'true (write) the episode or false (don't write) 

           		var warning = confirm('WARNING!  Episode '+newEpisodeNumber+' already exists!  Are you sure you want to rename episode '+newEpisodeNumber+'?');
           		
              if (warning){
           			console.log('user choose to delete old episode!');
          			//true means overwrite 
          			return true;
           		}else{ 
             		//false means don't overwrite
             		return false; 
           		}
           }else{
           	return true;
           }
     		};

    //writeHighLevelEpInfo(); used to write high level info to the dom
      function writeHighLevelEpInfo(){
        //clear out DOM 'enterEpisodeInfo'
        $('.enterEpisodeInfo').hide();

        //write to DOM where 'enterEpisodeInfo' used to be
        episodeInfoWrite(newEpisodeNumber);
        
        //if else statment showing podcastUrlForm ONLY if podcastUrl = '';
        $('.podcastUrlForm').show();
      };
	
	 //function to display 'Show Episode Info'
      var displayShowEpisodeEditButton = function(){
      $('.episodeEditButtonArea').append(showEpisodeEditButton);
      };
 
      //function to display 'Enter Episode Info'
      var displayEnterEpisodeInfo = function(){
      	$('.enterEpisodeInfo').append(enterEpisodeInfo);
      };

      //function to display 'Show Episode Notes Header'
	  var displayShowEpisodeNotesHeader = function(){
	  	$('.showEpisodeNotes').append(showEpisodeNotesHeader);
	  };

    //function that high level episode shit got deleted
      var shitGotDeleted = function(){
      $('.episodeInfoAdd').empty();
      newEpisodeName = '';
        /* delete:  episode description 
         *  $('.episodeDescriptionAdd').empty();
         *  newEpisodeDescription='';
         */
      };

    //function to empty() episode high level info
      var emptyEpisodeHighLevelInfo = function(){
        $('.episodeInfoAdd').empty();
        /* delete:  episode description 
         *  $('.episodeDescriptionAdd').empty();
         */

      };

    //function to write Episode Data to DOM
      var episodeInfoWrite = function(newEpisodeNumber){

        //2) Write to the DOM in episodeInfoAdd
        podlyGlobal.episodesRef.child(newEpisodeNumber).once("value", function(snapshot) {
          var infoShow = snapshot.val();
          $('.episodeInfoAdd').append(
            //"<hr>" +
            "<h4>" + "Episode " + newEpisodeNumber + " - " + infoShow.episodeName + "</h4>");

        /* delete:  episode description 
          //3) Write to the DOM in episodeDescriptionAdd
            //$('.episodeDescriptionAdd').append(
              //infoShow.episodeDescription);
              //console.log(snapshot.val());
        */

          //4 Append Edit Button in DOM
          $('.episodeEditButtonArea').show();


        },
        //Error code, appears in Console if read failed
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

        //Episode child_changed | Replace Episode Data in Dom when child is updated
          podlyGlobal.episodesRef.child(newEpisodeNumber).on("child_changed", function(snapshot) {
             //1st we clear the DOM of old episode info
            $('.episodeInfoAdd').empty();
            /* delete:  episode description 
            //  $('.episodeDescriptionAdd').empty();
            */
          });
    

        //Episode removed | Delete Episode Data in Dom when child is deleted
          podlyGlobal.episodesRef.child(newEpisodeNumber).on("child_removed", function(snapshot) {
             //1st we clear the DOM of old episode info
            shitGotDeleted();
            $('.episodeInfoAdd').append("<hr>" + "Episode " + newEpisodeNumber + " was deleted by an admin of your account");
          });
      };





//Part 1) Call Starting Functions & conditions    
    //shows 'enter episode info'
    displayEnterEpisodeInfo();

    //Edit Button
      //loads episode edit button
      displayShowEpisodeEditButton();
      //hides episode edit button
      $('.episodeEditButtonArea').hide();

    //Episode high level info (Ep #, name, description)
      //Clears DOM of Episode name/ description areas
      if(newEpisodeNumber='000'){
        //calls function to empty() episode high level info
        emptyEpisodeHighLevelInfo();
      }
		
      //Episode Notes
        //loads episode notes header
        displayShowEpisodeNotesHeader();
        //hides episode notes header
        $('.showEpisodeNotes').hide();      

//Part 2) Button Clicks
    
      //[Button] Update High Level Episode Info (click) = add high level episode info (Episode #, Name, Description)
      $('#submitButton').click(function(){
          //allow change of title
            //record 1st entry of ep#
            //if ep# is the same, just re-write title

          

          //takes input of 'Episode Number' field and assignes it to newEpisodeNumber
          newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();


          //takes input of 'Episode Name' Field and assignes it to newPodcastTitle
          newEpisodeName = $("input[id=episodeNameField]").val();

          //confirms episode number isn't a dup to avoid accidental overwrite
            var exists;
            var ref = new Firebase(podlyGlobal.episodesUrl); 
          
            if (lastEpisodeNumber == newEpisodeNumber){
                var eRef = new Firebase(podlyGlobal.episodesUrl+lastEpisodeNumber);
                  eRef.update({
                    episodeName: newEpisodeName
                  });

                //write updated info to DOM
                writeHighLevelEpInfo()
                
                return;
            };
          

            ref.child(newEpisodeNumber).once('value', function(snapshot) { 
              exists = (snapshot.val() !== null);
              if (episodeExistsCallback(newEpisodeNumber, exists) == false){
                  console.log("if() in episodeExistsCallback() returned false");
                  return;
              }else {
                //creates Firebase child under /users with newUserName
                  var eRef = podlyGlobal.episodesRef.child(newEpisodeNumber);
                  eRef.update({
                    episodeName: newEpisodeName
                  });

                //write updated info to DOM
                writeHighLevelEpInfo();                
              }
              
          }); 

          
	          //
	          //takes input of 'Episode Description' Field and assignes it to newEpisodeDescrption
	          //newEpisodeDescription=$("input[id=episodeDescription]").val();
	          //


      });


    //[Button] Edit High Level Episode Info (click) = edit high level episode info (Episode #, Name, Description)
    $('#episodeEditButton').click(function(){
        //calls function to empty() episode high level info
        emptyEpisodeHighLevelInfo();

        //hides episode edit button
        $('.episodeEditButtonArea').hide();

        //displayEnterEpisodeInfo();
        $('.enterEpisodeInfo').show();

        //puts latest episode info into input fields
          //set lastEpisodeNumber to detect if episode last entered is same as new episode
          lastEpisodeNumber = newEpisodeNumber; 
        $('#inputEpisodeNumber').val(newEpisodeNumber);
        $('#episodeNameField').val(newEpisodeName);
        // delete:  episode description 
        // $('#episodeDescription').val(newEpisodeDescription);
        //

        //hide Podcast URL field
        $('.podcastUrlEditButton').hide();

        //empty podcast URL
          $('.podcastUrl').empty();

        //show Enter Podcast URL
        $('.podcastUrlForm').show();

      });

//delete | test to confirm doc completely loaded
console.log("episodeHighLevel completly loaded");

};