/*Notes
  This doc (main_showNotes.js) takes user input about a new show note and enters it into the database
  
  How it works
    0) user enters 3 pieces of info
      a) note time (hh:mm:ss)
      b) note words
      c) note url
    1) Note time is converted to seconds and stored in the database along with note words / url
    ===
    2) Currently 'Edit' episode notes also resides here, but we'll likely be pulling it out and putting it elsewhere 
    
  The code below is seperated into X parts
    
    0)a)initilize variables, 0b) initilize functions, 0c) starting functions 
    
    1) High Level Episode Info [Button] Clicks (Ep #, Name)
      a) [Button] Submit Episode Info (click) = gets Episode number from DOM
      b) [Button] Podcast URL (click) = pull player URL from DOM and add player into Show notes
    
    2) Enter Show Notes
      a) 'noteButtonEnter' [Button] click = writes show notes to Firebase  
      b) turns input forms to fixed text

    3) Edit Show Notes
      a)
      b)
      c)
      d) swapping the {'Enter' [Button]} with {'Update' [Button]}

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
            $('#noteTimeInput').hide();
            $('.noteTimeContainer').append(secondsToHms(noteTime));

          //2) empty noteWordsCell and replace with text
            $('#noteWordsInput').hide();
            $('.noteWordsContainer').append(noteWords);

          //3) empty noteUrlInput and replace with text
            $('#noteUrlInput').hide();
            $('.noteUrlContainer').append(noteUrl);

          //4) swap [Enter] button for [Edit] button
            $('#noteButtonEnter').hide();
            $('#noteButtonEdit').show();

          //5) write to /time url = noteWords & noteUrl
            timeRef.set({
              noteWords: noteWords,
              noteUrl: noteUrl
            });
          };

  //Part 0c) starting Actions
    //Hide Edit Button
    $('#noteButtonEdit').hide();
    //Hide Update Button
    $('#noteButtonUpdate').hide();


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
            var deleteNoteRef = new Firebase(episodesUrl+'22/episodeNotes/'+oldNoteTime);
            deleteNoteRef.remove();
          }
      });




// Notes for right now

          //***may not be needed (see above *should*) if note time is changed in the row, delete rows previous note time
        
        //*** temporarily commenting this out so I can add all the time / show notes for episode 22 *** 
          /*delete old row time (if it exists)
          if(noteTimeCounter>0){
            //initialize oldTimeRef
            //var oldTimeRef = timeRef.child(oldNoteTime);

            //remove oldTime
            tRef.child(oldNoteTime).remove();

            /*replace oldNoteTime with noteTime
            oldTimeRef.update(noteTime);*
            //set oldNoteTimeto '', so we avoid accidentaly deleting a time we want to keep!
            oldNoteTime = '';
          }

          //increment noteTimeCounter so we know this row's time has been updated
            noteTimeCounter+=1;
          
          
      */


});
