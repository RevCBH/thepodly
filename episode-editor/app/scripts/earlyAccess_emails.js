/* Notes


This doc, earlyAccess_emails.js, collects earlyAccess email sign ups and writes them to the database 
  
How it works
  //on button click 
  //take input from field
  //write intput to db 

  
*/

// jshint devel:true

$(document).ready(function() {

//Part 0) initilizing variables & funcitons
  //part 0a) initilizing variables
  
    var userEmail;
      
   
  
  //Part 2) Button Clicks


   //part 2a) [Button] Enter Podcast URL (click) = write to Firebase
    $('.w-button button').click(function(){

      //A) takes input of 'Podcast URL' field and assignes it to newPodcastUrl
        userEmail=$("input[id=w-inputField]").val();

      //B) creates Firebase child under /earlyaccess/ with new email
        var ref = new Firebase('https://earlyaccess.firebaseio.com/earlyaccess/'); 
          var eRef = ref.child(emails);
          eRef.update({
            emails: userEmail
          });
        

      //C) manage transitiion from input state to showing podcast state   
        showPodcastUrl(podcastUrl);

        //show podcast player
        showPodcastPlayer(podcastUrl);
          
        

        //show Episode Notes Section
        $('.showEpisodeNotes').show();


      /* delte, moving to a function with the name above
        //show podcast url edit button
        $('.podcastUrlEditButton').show();

        //show podcast URL
        $('.podcastUrl').prepend('<hr>' + '<h5> Podcast URL: ' + podcastUrl + '</h5>');

        //hide podcast URL form
        $('.podcastUrlForm').hide();

        //4) show Episode Notes Section
        $('.showEpisodeNotes').show();
        */
    });


    //part 2b) [Button] Edit Podcast URL  (click) = edit Podcast URL
      $('#podcastUrlEditButton').click(function(){
        askPodcastUrl();
      });

//End brakets / pares / ;
});