$(document).ready(function() {

//initilizing variables
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
    var noteTime='';
    var noteWords='';
    var noteUrl='';

    // function initalization
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

//Starting Actions
  //Hide Edit Button
  $('#noteButtonEdit').hide();



//Button clicks

    //[Button] Submit Episode Info (click) = gets Episode number
    $('#submitButton').on('click', function() {
      //get Episode Number from input form and set it here
      newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();

    });


    //[Button] Podcast URL (click) = pull player URL from DOM and add player into Show notes
    $('#podcastUrlButton').click(function(){
        //takes input of 'Podcast URL' field and assignes it to newPodcastUrl
        podcastUrl=$("input[id=podcastUrlField]").val();

        //show Episode Notes Section
        $('.showEpisodeNotes').show();

        //show podcast URL
        $('.showEpisodeNotes').append('<audio controls type="audio/mpg" name="media" id="audioPlayer" width="480"><source src="' + podcastUrl + '" type="audio/mpeg" preload = "auto"></audio>');

        //onload="document.getElementById('audioPlayer').play(); document.getElementById('audioPlayer').currentTime=0"
    });


    //[Button] 'Enter' show notes = writes to Firebase
      $('#noteButtonEnter').click(function(){
        //Step 0)
          //if a note time has been prevoiusly created for this row, set oldNoteTime as a varable so you can delete it in Firebase and replace it with the new one
          if(noteTimeCounter>0){
            var oldNoteTime = noteTime;
          }

        //Step 1) Write to Firebase
          //get input time, assign to variable noteTime
          noteTime=hmsToSecondsOnly($("input[id=noteTimeInput]").val());
          //console.log('time entered is '+noteTime+ ' in seconds.')


//********** You are here | deleting old note times in Firebase if a new time is entered in a specific row **********/

            //if note time is changed in the row, delete rows previous note time
            //if noteTime counter >0, delete old noteTime in firebase before writing new noteTime in Firebase


          //get input words, assign to variable
          noteWords=$("input[id=noteWordsInput]").val();

          //get input url, assign to variable
          noteUrl=$("input[id=noteUrlInput]").val();


          //write time to firebase
          var eRef = episodesRef.child(newEpisodeNumber);
          var tRef = eRef.child("episodeNotes");
          //create new var for Firebase reference to tRefchid(noteTiem)
          var timeRef = tRef.child(noteTime);

          //temporarily commenting this out so I can add all the time / show notes for episode 22
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

          //write to /time url = noteWords & noteUrl
            timeRef.set({
              noteWords: noteWords,
              noteUrl: noteUrl
            });



        //Step 2) turn input forms to fixed text
          //empty noteTimeInput and replace with text
          $('#noteTimeInput').hide();
          $('.noteTimeContainer').append(hmsToSecondsOnly(noteTime));

          //empty noteWordsCell and replace with text
          $('#noteWordsInput').hide();
          $('.noteWordsContainer').append(noteWords);


          //empty noteUrlInput and replace with text
          $('#noteUrlInput').hide();
          $('.noteUrlContainer').append(noteUrl);

          //swap [Enter] button for [Edit] button
          $('#noteButtonEnter').hide();
          $('#noteButtonEdit').show();
      });



    //[Button] 'Edit' show notes = makes fields accessible again
      $('#noteButtonEdit').click(function(){

      //empty noteTimeCell, append form control, add value of noteTime into noteTimeInput
        //empty
          $('.noteTimeContainer').empty();
        //append
          //show noteTimeInput form field
          $('#noteTimeInput').show();
          //empty noteTimeInput to prep it for new value incase it's been changed externally
          $('#noteTimeInput').empty();
          //update value of field to be the time
          $('#noteTimeInput').val(hmsToSecondsOnly(noteTime));

      //empty noteWordsCell and append form control
        //empty
          $('.noteWordsContainer').empty();
        //append
          //show noteWordsInput form field
          $('#noteWordsInput').show();
          //empty noteWordsInput to prep it for new value incase it's been changed externally
          $('#noteWordsInput').empty();
          //update value of field to be the time
          $('#noteWordsInput').val(noteWords);


      //empty noteUrlCell and append form control
        //empty
          $('.noteUrlContainer').empty();
        //append form control
          //show noteWordsInput form field
          $('#noteUrlInput').show();
          //empty noteWordsInput to prep it for new value incase it's been changed externally
          $('#noteUrlInput').empty();
          //update value of field to be the time
          $('#noteUrlInput').val(noteUrl);

        //swap [Edit] button for [Enter] button
        $('#noteButtonEnter').show();
        $('#noteButtonEdit').hide();

      });

});
