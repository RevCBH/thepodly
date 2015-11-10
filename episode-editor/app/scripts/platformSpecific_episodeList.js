/*Notes
  This doc (platformSpecific_episodeList.js) does 1 things
  1) List all episodes of a particular podcast on it's platform.html page 
  
  How it works
   A) list episodes below show notes
   B) move it to the side of the screen & put a background color on it
   C) make it sticky 
    

  The code below is seperated into 5 parts
    0) initizlize variables
    1) Get mNum from url 
    2) use mNum ^ to generate list of episodes 
    3) Display Episode List (bonus: in decending order)
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
  

    //initialize table html
      var episodeListTableTop =
        '<table class="table table-hover  embed-notes-table-header">' +
          '<caption>Episode List</caption>' +
          '<thead>' +
            '<tr>' +
              '<th class="embed-notes-table__control">#</th>' +
              '<th class="embed-notes-table__link">name</th>' +
            '</tr>' +
          '</thead>' +
        '</table>' +
        '<div class="embed-notes-table-body-wrapper">' +
          '<table id="myTable" class="table table-hover embed-notes-table-body">' +
            '<tbody>'

      var episodeListTableBot =
            '</tbody>' +
          '</table>' +
        '</div>'




//NEW CODE HERE
  //


  //display list of episodes 

    //connect to db, find number, return name
    var ref =  new Firebase(rootUrl + 'mnum/' + mnum);
    //outer asynchronous function uses hashTime to figure out podcastName
    ref.on("value", function(snapshot){
      //empty episodeList
      $('.episodeList').empty();
      //add table top
      $('.episodeList').prepend(episodeListTableTop);


      var podcastName = snapshot.val();
      //test
      
      //initilize new firebase with path to podcastName / episodes
      var specialRef = new Firebase(rootUrl + 'podcasts/' + podcastName + '/episodes'); 

      //initilize episodeCounter which we'll use to create key references to each row's ID's
      var episodeCounter = 0;

      //write the number of each episode & it's name

      //first write the number

      specialRef.on("value", function(snapshot){
        //itterate through the rows and write out the table
        snapshot.forEach(function(childSnapshot){
          console.log("is this working at all? " + childSnapshot.key() + " "+ childSnapshot.val().episodeName);

          var episodetableGuts =
            '<tr class="' /*+ classToggle*/ +' row" id="spewCount_' + episodeCounter +'">' +
              '<td class="episodeList_number" id="episodeList_number_'+episodeCounter+'">' + childSnapshot.key()  + '</td>' +
              '<td class="episodeList_name" id="episodeList_name">' + childSnapshot.val().episodeName+'</td>' +
            '</tr>';
            $(".episodeList").find('tbody').append($(episodetableGuts));

          
        });
      }); 
    
        //table close (bottom)
      $("#episodeList").find('tbody').append($(episodeListTableBot));


      //re-load #mainCss to re-style page
      $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));


    });


//end bracket
}); 

