/*Notes

This doc, main_episodeHighLevel.js, is all about setting a podcast's Episode name & number 
  
  How it works
    0) user enters 2 pieces of info
      a) episode #
      b) episode name
      
    1) we write that to the database & deal with errors 
    
  The code below is seperated into X parts
    
    0)initilize a) variables & b) functions
    
    1) call starting functions & conditions 
      a) shows 'enter episode info'
      b) [Edit] Button | load & hide it for later use
      c) prep episode high level info (Ep #, name, description)
      * delete * d) load 'Episode Notes'

    2) [Button] clicks
      a) [Button] Update High Level Episode Info (click) = add high level episode info (Episode #, Name, Description)
      b) [Button] Edit High Level Episode Info (click) = edit high level episode info (Episode #, Name, Description)
    
    

*/


podlyGlobal.episodeHighLevel = function(){
//Part 0) initialize variables & functions

	//Part 0a) initialize variables
		//episode high level html
    var newEpisodeName;
    var showEpisodeEditButton = '<button class="btn btn-default" type="submit" role="button" id="episodeEditButton">Edit Episode Info</button>';
    var enterEpisodeInfo = '<h4>Enter Episode Info</h4><div class="row"><!-- Episode # --><div class="col-xs-2"><label for="newEpisodeNum">Episode #</label><input type="text" class="form-control" id="inputEpisodeNumber" placeholder="?" ></div><!-- Episode Name --> <div class="col-xs-3"><label for="episodeName">Episode Name </label><input type="text" class="form-control" placeholder="episode name?" id="episodeNameField"></div><!-- Update Button --> <div class="col-xs-2"></br><label>&nbsp;</label><button type="submit" class="btn btn-default" id="submitButton">Update</button></div><!--End "row" class--> </div>';
  	var lastEpisodeNumber; 

    //delete: Cut <!-- Episode Description --><div class="col-xs-4"><label for="episodeDescription">Episode Description</label> (Optional)<input type="text" class="form-control" placeholder="" id="episodeDescription"></div>
		//delete: var showEpisodeNotesHeader = '<hr><h4>Add Show Notes</h4>';
                

  //Part 0b)initialize functions 
    
    //function confirming user wants to wipe old episode; 
      function episodeExistsCallback(newEpisodeNumber, exists){
        //function either returns 'true (write) the episode or false (don't write) 
       	if (exists){
       	  var warning = confirm('WARNING!  Episode '+newEpisodeNumber+' already exists!  Are you sure you want to rename episode '+newEpisodeNumber+'?');
       		
          if (warning){
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

    /*delete function to display 'Show Episode Notes Header'
  	  var displayShowEpisodeNotesHeader = function(){
  	  	$('.showEpisodeNotes').append(showEpisodeNotesHeader);
  	  };
    */

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
        //Write to the DOM in episodeInfoAdd
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
          //Append Edit Button in DOM
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



//Part 1) call starting functions & conditions    
  //1a) shows 'enter episode info'
    displayEnterEpisodeInfo();

  //1b) [Edit] Button | load & hide it for later use
    //loads episode edit button
    displayShowEpisodeEditButton();
    //hides episode edit button
    $('.episodeEditButtonArea').hide();

  //1c) Episode high level info (Ep #, name, description)
    //Clears DOM of Episode name/ description areas
    if(newEpisodeNumber='000'){
      //calls function to empty() episode high level info
      emptyEpisodeHighLevelInfo();
    }
	
  /*delete 1d) Episode Notes
    //loads episode notes header
    displayShowEpisodeNotesHeader();
    //hides episode notes header
    $('.showEpisodeNotes').hide();      
  */

//Part 2) Button Clicks
    
  //2a) [Button] Update High Level Episode Info (click) = add high level episode info (Episode #, Name, Description)
    $('#submitButton').click(function(){
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
        }else{
          ref.child(newEpisodeNumber).once('value', function(snapshot) { 
            exists = (snapshot.val() !== null);
            if (episodeExistsCallback(newEpisodeNumber, exists) == false){
                console.log("if() in episodeExistsCallback() returned false");
                return;
            }else {
              //creates Firebase child under /users with newUserName
                var eRef = podlyGlobal.episodesRef.child(newEpisodeNumber);
                eRef.update({
                  episodeName: newEpisodeName, 
                  episodeNotes: ''
                });

              //write updated info to DOM
              writeHighLevelEpInfo();                
            }
          });
        }
          /* delete
            takes input of 'Episode Description' Field and assignes it to newEpisodeDescrption
            newEpisodeDescription=$("input[id=episodeDescription]").val();
          */
    });


    //2b) [Button] Edit High Level Episode Info (click) = edit high level episode info (Episode #, Name, Description)
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

};