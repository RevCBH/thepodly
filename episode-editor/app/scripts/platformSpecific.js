/*Notes
  This doc (platformSpecific.js) does 2 things
  A) makes the meta podcaster info sticky at top of platform.html 
  B) reads specific podcaster info the meta podcaster area
  
  How it works
   A) stick_in_parent() makes shit stick
   B) Reading info about podcaster 
    1) ?X gives us our Episode # (EP#) via writeEpisodeNumberFromUrl.js which saves the EP# in a session.
    2) This doc uses the EP# ^ to get Episode Header info (Episode Name, Description, etc) and the table of show notes.
    

  The code below is seperated into 5 parts
    0) initizlize variables
    1a) Retrieve Episode Number from URL
    1b) Use EpisodeNumber to set variables related to episodeNumber
    2) Display Episode Header from Firebase
    3) Display Episode Table from Firebase
*/

$(document).ready(function(){
//0: initalize variables

//keeps top of page (podcaster meta info) sticky at top of page 
$(".podcasterInfo").stick_in_parent();


//get podcaster meta info from url 
  
  // Gets '?foo=bar' from http://example.com/page.html?foo=bar
    var search = window.location.search;

  //seperate both sides of the '&'
    search = search.replace('?','');
    var tempStr = search.split('&');
  
  //assign left of & to embedEpisodeNumber, right to mnum
    var embedEpisodeNumber = tempStr[0];
    var mnum = tempStr[1];
  
    var rootUrl = 'https://sky-jump-run.firebaseio.com/';
  
    var reverseChronology = function (ref3){
    /* 
       How 
      1) create array, write all social items into array 
      2) spew items out of array with a function that wraps them in appropriate html 
        A) for loop | put them through a for loop that adds a '|' for i = array length - 1
        B) function | send each array item to a function that wraps <a href> html
        C) print | send to DOM 
    */

      // listen for all changes and update
      ref3.endAt().limitToFirst(10).on('value', update);

      // print the output of our array
      function update(snap) {
         var list = [];
          snap.forEach(function(ss) {
             var data = ss.val();
             //data['.priority'] = ss.getPriority();
             //data['.key'] = ss.key();
             list.unshift(data);
          });
         // prep to print results

      //check results

        //itterate throgh the list and print 1) time, 2) words, 3) url
        console.log('list length =  '+list.length); 
        var i;
        var j; 
        for (i=0; i<list.length; i++){
          $('#podcasterInfo_social').prepend('<a href ="' + list[i]['url'] + '" target="new">'+list[i]['site']+'</a>'); 
          if(i<list.length-1){
            $('#podcasterInfo_social').prepend(' | '); 
          }

        }        
    //end function update(sanap)
    };
  //end function reverseChronlology 
  }; 


  //figure out podcaster name based on mnum 
      //connect to db, find number, return name
      var ref =  new Firebase(rootUrl + 'mnum/' + mnum);
      //outer asynchronous function uses hashTime to figure out podcastName
      ref.on("value", function(snapshot){
        var podcastName = snapshot.val();
        console.log("is podcastName working?" + snapshot.val());
        //initizlie baseURL
        var baseUrl = rootUrl + 'podcasts/' + podcastName + '/podcastTitle'; 
        
        //initilize new firebase with path to podcastName / episodes
        var ref2 = new Firebase(rootUrl + 'podcasts/' + podcastName + '/podcastTitle'); 

        //inner asynchronous function writes Podcast Name to the DOM in podcasterInfo_title
        ref2.once("value", function(snapshot) {
          var infoShow = snapshot.val();
          console.log("is infoShow working? "+ snapshot.val()); 
          $('#podcasterInfo_title').append(
            infoShow);
        });

        
      //display social links 
        //initilize new firebase with path to podcastName / social / twitter
        var ref3 = new Firebase(rootUrl + 'podcasts/' + podcastName + '/social'); 

        /* Delete
        //inner asynchronous function writes Podcast Name to the DOM in podcasterInfo_title
        ref3.child('twitter').once("value", function(snapshot) {
          var infoShow = snapshot.val();
          if(infoShow != 'false'){
            //$('#podcasterInfo_social').prepend('<a href ="' + infoShow + '" target="new">Twitter</a>'); 
            console.log('info show: '+infoShow); 
          }
          else{console.log('shit is empty!');}
        });
      */


      //create array 
      
          //test if there are show notes, if there are, show them. if not, do nothing
          ref3.once('value', function(snapshot) {
            console.log('test value is: ' + snapshot.val());
            var exists = (snapshot.val() !== null);
            if (exists){
              //displays episode notes in referense choronology

              reverseChronology(ref3);
            
            }else{
              console.log('shit dont exist');
            }
          });
      });







//end bracket
}); 
































































































