// jshint devel:true

(function() {

  //initilizing variables
    

   

    //episode specific variables
      //setting newEpisodeNumber to 000 as a base value so I can hide it till it has a non 0 value when entered
      //delete or reinstate | var 
      //var newEpisodeNumber = '000';

      //delete soon: just testing this
      sessionStorage.setItem('newEpisodeNumber', newEpisodeNumber);

      
      /* delete:  episode description 
        var newEpisodeName = '';
        var newEpisodeDescription = '';
      */
      var podcastUrl = '';

    //initilaizing html strings to load at start

      /* delete Moving to main_episodeHighLevel.js
        //episode high level html
        var showEpisodeEditButton = '<button class="btn btn-default" type="submit" role="button" id="episodeEditButton">Edit Episode Info</button>';
        var enterEpisodeInfo = '<h4>Enter Episode Info</h4><div class="row"><!-- Episode # --><div class="col-xs-2"><label for="newEpisodeNum">Episode #</label><input type="text" class="form-control" id="inputEpisodeNumber" placeholder="?" ></div><!-- Episode Name --> <div class="col-xs-3"><label for="episodeName">Episode Name </label><input type="text" class="form-control" placeholder="episode name?" id="episodeNameField"></div><!-- Update Button --> <div class="col-xs-2"></br><label>&nbsp;</label><button type="submit" class="btn btn-default" id="submitButton">Update</button></div><!--End "row" class--> </div>';
        //delete: Cut <!-- Episode Description --><div class="col-xs-4"><label for="episodeDescription">Episode Description</label> (Optional)<input type="text" class="form-control" placeholder="" id="episodeDescription"></div>
        //episode notes
        var showEpisodeNotesHeader = '<hr><h4>Add Show Notes</h4>';
      */

      //podcast media
      //var showPodcastUrlForm = '<hr><h4>Enter Podcast URL</h4><form class="form-inline"><div class="form-group"><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button></div></form>'
      var showPodcastUrlForm ='<hr><h4>Enter Podcast URL</h4><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button>';
      var podcastUrlEditButton = '<button type="submit" class="btn btn-default" id="podcastUrlEditButton">Edit URL</button>';

      



  //function setup
    
    /* delete Moving to main_episodeHighLevel.js
      //function to display 'Show Episode Info'
      var displayShowEpisodeEditButton = function(){
      $('.episodeEditButtonArea').append(showEpisodeEditButton);
      };

      //function to display 'Enter Episode Info'
      var displayEnterEpisodeInfo = function(){
      $('.enterEpisodeInfo').append(enterEpisodeInfo);
      };
    */

    //function to display 'Podcast URL form'
    var displayPodcastUrlForm = function(){
    $('.podcastUrlForm').append(showPodcastUrlForm);
    };


    //function to display 'Podcast URL Edit Button '
    var displayPodcastUrlEditButton = function(){
    $('.podcastUrlEditButton').append(podcastUrlEditButton);
    };

    /* delete Moving to main_episodeHighLevel.js
    //function to display 'Show Episode Notes Header'
    var displayShowEpisodeNotesHeader = function(){
    $('.showEpisodeNotes').append(showEpisodeNotesHeader);
    };

    //function that high level episode shit got deleted
      var shitGotDeleted = function(){
        $('.episodeInfoAdd').empty();
        newEpisodeName = '';
        // delete:  episode description 
        //  $('.episodeDescriptionAdd').empty();
        //  newEpisodeDescription='';
        //
      };

    //function to empty() episode high level info
      var emptyEpisodeHighLevelInfo = function(){
        $('.episodeInfoAdd').empty();
        // delete:  episode description 
        //  $('.episodeDescriptionAdd').empty();
        //

      };

    //function to write Episode Data to DOM
      var episodeInfoWrite = function(newEpisodeNumber){

        //2) Write to the DOM in episodeInfoAdd
        episodesRef.child(newEpisodeNumber).once("value", function(snapshot) {
          var infoShow = snapshot.val();
          $('.episodeInfoAdd').append(
            //"<hr>" +
            "<h4>" + "Episode " + newEpisodeNumber + " - " + infoShow.episodeName + "</h4>");

        /* delete:  episode description 
          //3) Write to the DOM in episodeDescriptionAdd
            //$('.episodeDescriptionAdd').append(
              //infoShow.episodeDescription);
              //console.log(snapshot.val());
        

          //4 Append Edit Button in DOM
          $('.episodeEditButtonArea').show();


        },
        //Error code, appears in Console if read failed
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

        //Episode child_changed | Replace Episode Data in Dom when child is updated
          episodesRef.child(newEpisodeNumber).on("child_changed", function(snapshot) {
             //1st we clear the DOM of old episode info
            $('.episodeInfoAdd').empty();
            // delete:  episode description 
            //  $('.episodeDescriptionAdd').empty();
            //
          });
    

        //Episode removed | Delete Episode Data in Dom when child is deleted
          episodesRef.child(newEpisodeNumber).on("child_removed", function(snapshot) {
             //1st we clear the DOM of old episode info
            shitGotDeleted();
            $('.episodeInfoAdd').append("<hr>" + "Episode " + newEpisodeNumber + " was deleted by an admin of your account");
          });
      };
      */
  //calling starting funcitons and conditionals
    
    //hides podcastAudioArea
    $('podcastAudioArea').hide();

    /* delete Moving to main_episodeHighLevel.js
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
    */

    //Podcast Media
      //loads podcast url form
      displayPodcastUrlForm();
      //hides podcast url form
      $('.podcastUrlForm').hide();

      //loads podcast url edit button
      displayPodcastUrlEditButton();
      //hides podcast url edit button
      $('.podcastUrlEditButton').hide();



    

    //starts global function to run episodeHighLevel 
    //this collects name/ep number and sets the global var for both
      podlyGlobal.episodeHighLevel(); 


  //Button Clicks
    /* delete Moving to main_episodeHighLevel.js
      //[Button] Update High Level Episode Info (click) = add high level episode info (Episode #, Name, Description)
      $('#submitButton').click(function(){
          //takes input of 'Episode Number' field and assignes it to newEpisodeNumber
          newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();


          //takes input of 'Episode Name' Field and assignes it to newPodcastTitle
          newEpisodeName = $("input[id=episodeNameField]").val();


          //
          //takes input of 'Episode Description' Field and assignes it to newAuthor
          //newEpisodeDescription=$("input[id=episodeDescription]").val();
          //

          //creates Firebase child under /users with newUserName
          var eRef = episodesRef.child(newEpisodeNumber);
          eRef.set({
            episodeName: newEpisodeName,
            // delete:  episode description 
            // episodeDescription: newEpisodeDescription,
            episodeNotes: ''
          });

          //clear out DOM 'enterEpisodeInfo'
          $('.enterEpisodeInfo').hide();


          //write to DOM where 'enterEpisodeInfo' used to be
          episodeInfoWrite(newEpisodeNumber);


          //if else statment showing podcastUrlForm ONLY if podcastUrl = '';
          $('.podcastUrlForm').show();


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

      */

       //[Button] Podcast URL (click) = write to Firebase
      $('#podcastUrlButton').click(function(){
          //1) takes input of 'Podcast URL' field and assignes it to newPodcastUrl
          podcastUrl=$("input[id=podcastUrlField]").val();

          //2) creates Firebase child under /users with newUserName
          var eRef = episodesRef.child(newEpisodeNumber);
          eRef.update({
            podcastUrl: podcastUrl
          });

          //show podcast url edit button
          $('.podcastUrlEditButton').show();

          //show podcast URL
          $('.podcastUrl').prepend('<hr>' + '<h5> Podcast URL: ' + podcastUrl + '</h5>');


          //hide podcast URL form
          $('.podcastUrlForm').hide();



          //4) show Episode Notes Section
          $('.showEpisodeNotes').show();
        });


        //[Button] Podcast URL Edit (click) = edit Podcast URL
      $('#podcastUrlEditButton').click(function(){
          //empty podcast URL
          $('.podcastUrl').empty();

          //hide podcast 'edit URL' button
          $('.podcastUrlEditButton').hide();


          //show podcast URL form
          $('.podcastUrlForm').show();

        });



//End brakets / pares / ;
})();





$(document).ready(function() {
  // Setup Bootstrap tab handlers for the navigation pills in
  // the page header
  $('#header-nav li a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
