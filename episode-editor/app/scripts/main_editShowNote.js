/* Consider putting edit code back in with main_showNotes and/or breaking out 
 * funcitons which are used in both places (there are several)


/*Notes
  This doc (main_editShowNotes.js) allows users to edit each show note directly in the table of show notes. 
  
  How it works
    0) user clicks 'Edit' button for any row in the show note table
    1) fields in the row convert to editable fields, this includes (time, words, url)
    2) after making changes, the user hits the 'update' [Button] and the changes are saved inline. 
    // Note time is converted to seconds and stored in the database along with note words / url
    =
    
    
  The code below is seperated into X parts
    
    0)
    1)
    2) 

  Dependencies
    '#tableNoteButtonUpdate' [Button] is initially hidden at main_showNotesTable.js

*/


$(document).ready(function() {
//Part 0) initilize variables / initilize functions / starting functions 

  //Part 0a) initilizing variables
  
      //create firebase references
      var rootUrl = Config.firebase.rootUrl;
      var myDataRef = new Firebase(rootUrl);

      var episodesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/';
      var episodesRef = new Firebase(episodesUrl);

      //variable initialization
  //****** Change value of newEpisodeNumber back to '' after getting time write to work on Firebase
      var newEpisodeNumber = 22;
      var podcastUrl='';

  //noteTimeCounter may need serialization as we scale table
      var noteTimeCounter = '0';

      //form control html
      var noteTimeInput = '<input type="text" class="form-control" id="noteTimeInput" placeholder="time hh:mm:ss">';
      var noteWordsInput = '<input type="text" class="form-control" id="noteWordsInput" placeholder="words">';
      var noteUrlInput = '<input type="text" class="form-control" id="noteUrlInput" placeholder="url">';

      //note
      var noteTime;
      var noteWords;
      var noteUrl;

  //Part 0b) function initalization
       
        //function: convert hh:mm:ss to seconds
            var hmsToSecondsOnly = function(str) {
              var p = str.split(':'),
                  s = 0, m = 1;

              while (p.length > 0) {
                  s += m * parseInt(p.pop(), 10);
                  m *= 60;
              }

              return s;
          };

        //function: convert seconds to hh:mm:ss     
          var secondsToHms =  function(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
            return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
          }

    //function: write show note to firebase
        var writeShowNotesToFirebase = function(){
        //A) Get inputs, assign to variables, write to firebase
          //1) get input time, assign to variable noteTime
            noteTime=hmsToSecondsOnly($("input[id=noteTimeInput]").val());

          //2) get input words, assign to variable
            noteWords=$("input[id=noteWordsInput]").val();

          //3) get input url, assign to variable
            noteUrl=$("input[id=noteUrlInput]").val();

          //4) write time to firebase
            var eRef = episodesRef.child(newEpisodeNumber);
            var tRef = eRef.child("episodeNotes");
            
          //5) create new var for Firebase reference to tRefchid(noteTiem)
            var timeRef = tRef.child(noteTime);

        //B) turn input forms to fixed text
          //1) empty noteTimeInput and replace with text
            $('input#noteTimeInput').html('');
            /* Hiding this so we don't go into edit mode when entering a show note
              $('#noteTimeInput').hide();
              $('.noteTimeContainer').append(secondsToHms(noteTime));
            */

          //2) empty noteWordsCell and replace with text
            $('#noteWordsInput').empty();
            /* Hiding this so we don't go into edit mode when entering a show note
              $('#noteWordsInput').hide();
              $('.noteWordsContainer').append(noteWords);
            */

          //3) empty noteUrlInput and replace with text
            $('#noteUrlInput').empty();
            /* Hiding this so we don't go into edit mode when entering a show note
             * $('#noteUrlInput').hide();
             * $('.noteUrlContainer').append(noteUrl);
            */

          /* Hiding this so we don't go into edit mode when entering a show note
           * 4) swap [Enter] button for [Edit] button
           * $('#noteButtonEnter').hide();
           * $('#noteButtonEdit').show();
           */

          //5) write to /time url = noteWords & noteUrl
            timeRef.set({
              noteWords: noteWords,
              noteUrl: noteUrl
            });
          };

  //Part 0c) starting Actions
    

    ////Hide Update Button via main_showNotesTable.js using 
      //$('#tableNoteButtonUpdate').hide(); 

    


  



//Part 1) Button clicks

  //Part 1a) [Button] Submit Episode Info (click) = gets Episode number from DOM
    $('#submitButton').on('click', function() {
      //get Episode Number from input form and set it here
      newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();

      //incrament noteTimeCounter
      noteTimeCounter += 1;
    });


  //Part 1b) [Button] Podcast URL (click) = pull player URL from DOM and add player into Show notes
    $('#podcastUrlButton').click(function(){
        //takes input of 'Podcast URL' field and assignes it to newPodcastUrl
        podcastUrl=$("input[id=podcastUrlField]").val();

        //show Episode Notes Section
        $('.showEpisodeNotes').show();

        //show podcast URL
        $('.showEpisodeNotes').append('<audio controls type="audio/mpg" name="media" id="audioPlayer" width="480"><source src="' + podcastUrl + '" type="audio/mpeg" preload = "auto"></audio>');

        //onload="document.getElementById('audioPlayer').play(); document.getElementById('audioPlayer').currentTime=0"
    });


//Part 2) show notes [Button] clicks = writes show notes to Firebase  
      $('#noteButtonEnter').click(function(){
        writeShowNotesToFirebase(); 
      });


//Part 3) edit show notes
  
  //[Button] 'Edit' show notes = makes fields accessible again  
    $('#noteButtonEdit').click(function(){
    //empty noteTimeCell, append form control, add value of noteTime into noteTimeInput
    
    //Part 3a) empty time / append form control 
      //empty time form field
        $('.noteTimeContainer').empty();
        
      //append show note TimeInput form field
        $('#noteTimeInput').show();
        //empty noteTimeInput to prep it for new value incase it's been changed externally
        $('#noteTimeInput').empty();
        //update value of field to be the time
        $('#noteTimeInput').val(secondsToHms(noteTime));
        
      
    //Part 3b) empty words / append form control 
      //empty noteWordsCell  
        $('.noteWordsContainer').empty();
      
      //append form control
        //show noteWordsInput form field
        $('#noteWordsInput').show();
        //empty noteWordsInput to prep it for new value incase it's been changed externally
        $('#noteWordsInput').empty();
        //update value of field to be the time
        $('#noteWordsInput').val(noteWords);


    //Part 3c) empty noteUrlCell / append form control
      //empty
        $('.noteUrlContainer').empty();
      
      //append form control
        //show noteWordsInput form field
        $('#noteUrlInput').show();
        //empty noteWordsInput to prep it for new value incase it's been changed externally
        $('#noteUrlInput').empty();
        //update value of field to be the time
        $('#noteUrlInput').val(noteUrl);


      //Part 3d) swapping the {'Enter' [Button]} with {'Update' [Button]}
        //swap [Edit] button for [Enter] button
        $('#noteButtonUpdate').show();
        $('#noteButtonEdit').hide();
    });
      
      $('#noteButtonUpdate').click(function(){
        console.log('noteTime is ' + noteTime);
        console.log('noteTimeCounter is ' + noteTimeCounter);
        
        var oldNoteTime = noteTime;
        console.log('oldNoteTime is ' + oldNoteTime);

        //A) call writeShowNotesToFirebase() function to write edited show notes to FB
        writeShowNotesToFirebase(); 

        //B) hide 'Update' [Button]
        $('#noteButtonUpdate').hide();

//*** 3rd ********** You are here | Looks for changes in time, deletes old time and replaces with new time  **********

        //C)looks a show note's time has been changed, if it has it deletes old time child in Firebase 
          
          /*how it works
            1. when 'edit' [Button] is clicked... 
              a) Prep the row to be deleted via 'noteTimeCounter'
                //variable counter from 0 to 1 
            2. when 'update' [Button] is clicked
              a)  if ('noteTimeCounter' > 0){delete oldtime in fb}; 
          */
            
          //if a note time has been prevoiusly created for this row, set oldNoteTime as a varable so you can delete it in Firebase and replace it with the new one
          if(oldNoteTime!=noteTime){
            
            console.log('Theres an old note time at ' + oldNoteTime + 'that needs to be delted'); 

            //delete cellTime child from Firebase | //test 1 = hard code (test 2 = variable based on cellTime)
            var deleteNoteRef = new Firebase(episodesUrl+newEpisodeNumber+'/episodeNotes/'+oldNoteTime);
            deleteNoteRef.remove();
          }
      });



});
