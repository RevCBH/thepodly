/* Notes


This doc, earlyAccess_emails.js, collects earlyAccess email sign ups and writes them to the database 
  
How it works
  //on button click 
  //take input from field
  //write intput to db 

  
*/

// jshint devel:true

$(document).ready(function(){

//Part 0) initilizing variables & funcitons
  //part 0a) initilizing variables
  console.log("is anything running at all?")

    var userEmail;
      
   
  
  //Part 2) Button Clicks


   //part 2a) [Button] Enter Podcast URL (click) = write to Firebase
    $('.w-button button').click(function(){

      //A) takes input of 'Podcast URL' field and assignes it to newPodcastUrl
        userEmail=$("input[id=w-inputField]").val();

        console.log('are we getting input? : ' + userEmail); 

      //B) creates Firebase child under /earlyaccess/ with new email
        var ref = new Firebase('https://earlyaccess.firebaseio.com/earlyaccess/'); 
          var eRef = ref.child(emails);
          eRef.update({
            emails: userEmail
          });
        

    });



//End brakets / pares / ;
})();