/* **** Move Edit Episode Info to another doc **** */

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


podlyGlobal.showNoteCreator = function(podcastUrl){
//Part 0) initilize variables / initilize functions / starting functions 

  //Part 0a) initilizing variables
  
    /*delete old firebase references
      //create firebase references
      var rootUrl = Config.firebase.rootUrl;
      var myDataRef = new Firebase(rootUrl);

      var episodesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/';
      var episodesRef = new Firebase(episodesUrl);
    */

      //variable initialization
  //****** Change value of newEpisodeNumber back to '' after getting time write to work on Firebase
      //delete | var newEpisodeNumber = 22;
      //delete | now a global var | var podcastUrl='';

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

      //html
      var showNotesHtml = '<table class="table table-hover"> <caption>Add a Show Note to Episode ' + newEpisodeNumber + '</caption> <thead> <tbody> <thead> <tr> <th> </th> <th>time</th> <th>words</th> <th>url</th> <th>&nbsp;</th> </tr> </thead> <tr class = "success"> <div class="row"> <td id="notePlayButtonCell"> &nbsp; </td> <td id="noteTimeCell"> <input type="text" class="form-control" id="noteTimeInput" placeholder="time | hh:mm:ss"> <div class="noteTimeContainer"></div> </td> <td id="noteWordsCell"> <input type="text" class="form-control" id="noteWordsInput" placeholder="words"> <div class="noteWordsContainer"></div> </td> <td id="noteUrlCell"> <input type="text" class="form-control" id="noteUrlInput" placeholder="url"> <div class="noteUrlContainer"></div> </td> <td id="noteButtonAreaCell"> <button type="button" class="btn btn-default" id="noteButtonEnter">Enter</button> <button type="button" class="btn btn-default" id="noteButtonEdit">Edit</button> <button type="button" class="btn btn-default" id="noteButtonUpdate">Update</button> </td> </div> </tr> </tbody> </table>';

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
      //delete test
        console.log('start works: writeShowNotesToFirebase');
      //A) Get inputs, assign to variables, write to firebase
        
        //1) get input time, assign to variable noteTime
          noteTime=hmsToSecondsOnly($("input[id=noteTimeInput]").val());

        //2) get input words, assign to variable
          noteWords=$("input[id=noteWordsInput]").val();

        //3) get input url, assign to variable
          noteUrl=$("input[id=noteUrlInput]").val();

        //4) write time to firebase
          var eRef = podlyGlobal.episodesRef.child(newEpisodeNumber);
          var tRef = eRef.child("episodeNotes");
          
        //5) create new var for Firebase reference to tRefchid(noteTiem)
          var timeRef = tRef.child(noteTime);

      //B) turn input forms to fixed text
        //1) empty noteTimeInput and replace with text
          $("input[id=noteTimeInput]").val('');
          //delete | $('input#noteTimeInput').html('');
          /* Hiding this so we don't go into edit mode when entering a show note
            $('#noteTimeInput').hide();
            $('.noteTimeContainer').append(secondsToHms(noteTime));
          */

        //2) empty noteWordsCell and replace with text
          $("input[id=noteWordsInput]").val('');
          /* Hiding this so we don't go into edit mode when entering a show note
            $('#noteWordsInput').hide();
            $('.noteWordsContainer').append(noteWords);
          */

        //3) empty noteUrlInput and replace with text
          $("input[id=noteUrlInput]").val('');
          /* Hiding this so we don't go into edit mode when entering a show note
           * $('#noteUrlInput').hide();
           * $('.noteUrlContainer').append(noteUrl);
          */

        /* Hiding this so we don't go into edit mode when entering a show note
         * 4) swap [Enter] button for [Edit] button
         * $('#noteButtonEnter').hide();
         * $('#noteButtonEdit').show();
         */

      //C) write to /time url = noteWords & noteUrl
          timeRef.set({
            noteWords: noteWords,
            noteUrl: noteUrl
          });
      console.log('end works: writeShowNotesToFirebase');
      };

      //function to empty noteTimeCell, append form control, add value of noteTime into noteTimeInput
        var editShowNotesButtonClick = function(){
          
          
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
            };


          var updateShowNotesButtonClick = function(){
            console.log('noteTime is ' + noteTime);
            console.log('noteTimeCounter is ' + noteTimeCounter);
            
            var oldNoteTime = noteTime;
            console.log('oldNoteTime is ' + oldNoteTime);

            //A) call writeShowNotesToFirebase() function to write edited show notes to FB
            writeShowNotesToFirebase(); 

            //B) hide 'Update' [Button]
            $('#noteButtonUpdate').hide();


            if(oldNoteTime!=noteTime){
              
              console.log('Theres an old note time at ' + oldNoteTime + 'that needs to be delted'); 

              //delete cellTime child from Firebase | //test 1 = hard code (test 2 = variable based on cellTime)
              var deleteNoteRef = new Firebase(episodesUrl+'22/episodeNotes/'+oldNoteTime);
              deleteNoteRef.remove();
            }
  
    };


  //Part 0c) starting Actions
    //show 'add show note'    
    $('.showNotesCreateArea').append(showNotesHtml);

    //Hide Edit Button
    $('#noteButtonEdit').hide();
    //Hide Update Button
    $('#noteButtonUpdate').hide();


//Part 1) Button clicks

  /*delete, this has been moved to main_episodeHighLevel.js
    //Part 1a) [Button] Submit Episode Info (click) = gets Episode number from DOM
      $('#submitButton').on('click', function() {
        
        //get Episode Number from input form and set it here
        newEpisodeNumber=$("input[id=inputEpisodeNumber]").val();

        //incrament noteTimeCounter
        noteTimeCounter += 1;
      });
  */

  /* Delete moving to main_podcastAudio.js
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

  */

//Part 2) show notes [Button] clicks = writes show notes to Firebase  
      $('#noteButtonEnter').click(function(){
        writeShowNotesToFirebase(); 
      });


//Part 3) edit show notes 
  
  //[Button] 'Edit' show notes = makes fields accessible again  
    $('#noteButtonEdit').click(function(){
      editShowNotesButtonClick(); 
    });
      
  //[Button] 'Update' show notes = writes new info to FB & hides fields
      $('#noteButtonUpdate').click(function(){
        updateShowNotesButtonClick();
      });

};
