/*Notes
  This doc (writeEmbedMagic.js) outputs Episode Header info and table to our Embed Template page.
  How it works
    0) embed.html/?X is served
    1) ?X gives us our Episode # (EP#) via writeEpisodeNumberFromUrl.js which saves the EP# in a session.
    2) This doc uses the EP# ^ to get Episode Header info (Episode Name, Description, etc) and the table of show notes.
    3) As EP data is retrieved from Firebase it's written to embed.html in realtime in each place it's served.  #Beautiful

  The code below is seperated into 5 parts
    0) initizlize variables
    1a) Retrieve Episode Number from URL
    1b) Use EpisodeNumber to set variables related to episodeNumber
    2) Display Episode Header from Firebase
    3) Display Episode Table from Firebase
*/

$(document).ready(function(){
//0: initalize variables
  /* delete | twitter
    var twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
     
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));*/

  //initialize firebase variables
      var rootUrl = 'https://sky-jump-run.firebaseio.com/';
      var myDataRef = new Firebase(rootUrl);

      var episodesUrl = rootUrl + 'podcasts/thetimferrissshow/episodes/';
      var episodesRef = new Firebase(episodesUrl);


//part 1a: Retrieve Episode number from URL

  //search for ?
    var search = window.location.search; // Gets '?foo=bar' from http://example.com/page.html?foo=bar
      console.log('search before operation is: '+ search);

    //remove ?
      search=search.replace('?','');

    //convert # to number
      var embedEpisodeNumber = Number(search);

    //confirm search is removed
      console.log('search after operation is: '+ embedEpisodeNumber);


//part 1b: Use Episode Number to set variables related to specific Episode

  //initialize episode specific variables
      var nameOfEpisode;
      var infoShow;

    //initialize base URL
     //? Use for Twitter links, but make programatic insted of base | var baseUrl = 'https://resplendent-inferno-6819.firebaseapp.com/prototype/dist-copy/hyr_22.html';


    //initialize table stuff
       var episodeNotesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/thetimferrissshow/episodes/'+embedEpisodeNumber+'/episodeNotes';
       var episodeNotesRef = new Firebase(episodeNotesUrl);

    //initialize table html
      var tableTop = '<table id="myTable" class="table table-hover"> <caption>  Episode ' + embedEpisodeNumber +  ' Show Notes </caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>note</th> <th>link</th> <th>share</th> </thead>';
      var tableBot ='</tbody></table>';





//part 2: Display Episode Header from Firebase (Episode #, Name, Description)

  //function to write Episode Data to DOM
      var episodeInfoWrite = function(newEpisodeNumber){

        //Write to the DOM in episodeInfoAdd
        episodesRef.child(embedEpisodeNumber).once("value", function(snapshot) {
          var infoShow = snapshot.val();
          $('.episodeNameTest').append(
            //"<hr>" +
            "<h4>" + "Episode " + embedEpisodeNumber + " - " + infoShow.episodeName + "</h4>");

        //Write to the DOM in episodeDescriptionAdd
          $('.episodeDescriptionTest').append(
            infoShow.episodeDescription);
            //console.log(snapshot.val());
        });
      };

     episodeInfoWrite(embedEpisodeNumber);

// starting code

   
// part 3: Display Episode Table from Firebase

    //Load the table data (middle of table) from firebase

    //delete | var ref2 = new Firebase("https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes");

    episodeNotesRef.on("value", function(snapshot) {
      $('.spewTime').empty();
        //add table header
      $('.spewTime').prepend(tableTop);

      //initilize spewCounter which we'll use to create key references to each row's ID's
      var spewCounter = 0;

      var thingy;

       //function to show URL as a link
          var addUrl =  function(url){
          //$('.spewTime').prepend(thingy);
          //if url isn't blank
          if(url!==''){
            //$('.spewTime').prepend(thingy);
            return '<a href="'+url+'" target="_blank">Link</href>';
            }else{
              return "";
            }
          };
        //function to turn time into something readable
          var timeClean = function(seconds){
            //show hours if there's enough time
        var cellTimes = seconds;
        var formatTime = moment().startOf('day')
              .seconds(cellTimes)
              .format('H:mm:ss');
              return formatTime;

      };
        /////test writing time in mm:ss and use this for error correction
        //$('.timeShow').prepend(moment.duration(timeClean(200)).asSeconds());
        //$('.timeShow').prepend(timeClean(2123)+" this is a thing!");


      //itterate through the rows and write out the table
      snapshot.forEach(function(childSnapshot) {

        spewCounter++;

        //Hidden reference | simple Firebase code
        //$('.spewTime').append(spewCounter + ') ' + childSnapshot.key() + '</br>' + childSnapshot.val().noteWords + '</br>' + childSnapshot.val().noteUrl + '<p></p><p></p>');

        //styles the table with every other rowe getting the 'info' class (even = 'info', odd ='' )
        var classToggle = '';
        if(spewCounter%2 === 0){
          var classToggle = 'info';
        }

        //create rows in the table

        //hide till bring back twitter button | var twitterDrop='<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+ baseUrl + '#' +childSnapshot.key() +'" data-text="'+ childSnapshot.val().noteWords +'" data-count="none">Tweet</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>';
      //var twitterDrop='';

      var hashtag1 = "4hourworkweek"; 
      var hashtag2 = "podcast"; 
      var shareTweetButton = '<a class="twitter-share-button"href="https://twitter.com/intent/tweet"data-hashtags="' + hashtag1 + ', ' + hashtag2 +'"data-size="large"data-count="none"data-text="'+ childSnapshot.val().noteWords +'"data-url="https://sky-jump-run.firebaseapp.com/embed2.html?' + embedEpisodeNumber+'#+'+childSnapshot.key()+'"> Tweet </a>';


      var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell" spewCount="'+spewCounter+'"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell_spewCount_'+spewCounter+'">' + timeClean(childSnapshot.key())  + '</td> <td id="noteWordsCell">' + childSnapshot.val().noteWords+'</td> <td id="noteUrlCell">' + addUrl(childSnapshot.val().noteUrl)  + '<td id="shareTweetCell">' + shareTweetButton + '</td></div> </tr>';
        $("#myTable").find('tbody').append($(tableGuts));
        //$("#hideOldTime").hide();
        //$("#showNewTime").show();
        //console.log(timeClean(2123));
        twttr.widgets.load(); 
      });

        

        //table close (bottom)
      $("#myTable").find('tbody').append($(tableBot));


      //re-load #mainCss to re-style page
      $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));

    // ending code
        //addUrl(thingy);

    });


//4: Audio Player
  //initialize variables
    var audioSource= "http://traffic.libsyn.com/timferriss/Tim_Ferriss_Show_-_Jocko_Willink.mp3";
    var audioPlayer = '<audio controls preload="load" id="audioPlayer"><source src="' + audioSource + '" type="audio/mpeg"></audio>';
    var cellTime;
    var formatTime;
    var hash=0;


  //# to set playhead
    //search for hash
      hash = window.location.hash; // Gets '#foo' from http://example.com/page.html#foo
      //console.log('hash before operation is: '+ hash);
      //remove #
        hash=hash.replace('#','');

      //convert # to number
        var hashTime = Number(hash);

      //confirm hash is removed
        console.log('hash after operation is: '+ hashTime);


  //starting code
    //write html into dom podcastAudioArea
    $('.podcastAudioArea').append('<h5>Podcast Audio</h5>' + audioPlayer);

    //set hash to be playtime
      if(hashTime !=0 || hashTime !== ''){
        console.log('hash is not equal to 0 or ""');
        cellTime = hashTime;
      //for testing only, this autoplays audio | document.getElementById('audioPlayer').play();
      document.getElementById('audioPlayer').currentTime=(cellTime);
      var audio = $("#audioPlayer");
                  audio.trigger('play');
    }
  
  //Master Audio Controls
    //html for control [button]s
      // [button] back 5 sec
      var masterAudioControl_backFiveSec = '<button type="button" class="btn btn-default btn-sm" id="masterAudioControl_backFiveSec" alt="back 5 seconds"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></button>';
      // [button] back 2 sec
      var masterAudioControl_backTwoSec = '<button type="button" class="btn btn-default btn-sm" id="masterAudioControl_backTwoSec" alt="back 2 seconds"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>';
      // [button] play
      var masterAudioControl_play = '<button type="button" class="btn btn-default btn-sm" id="masterAudioControl_play"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>';
        // [button] pause
        var masterAudioControl_pause = '<button type="button" class="btn btn-default btn-sm" id="masterAudioControl_pause"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></button>';
        // [button] forward 2 sec
        var masterAudioControl_forwardTwoSec = '<button type="button" class="btn btn-default btn-sm" id="masterAudioControl_forwardTwoSec" alt="forward 2 seconds"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>';
        // [button] forward 5 sec
        var masterAudioControl_forwardiveSec = '<button type="button" class="btn btn-default btn-sm" id="masterAudioControl_forwardiveSec" alt="forward 5 seconds"><span class="glyphicon glyphicon-forward" aria-hidden="true"></span></button>';
        //all the buttons!
        var masterAudioControl_all = masterAudioControl_backFiveSec + '&nbsp;' + masterAudioControl_backTwoSec + '&nbsp;' + masterAudioControl_play + '&nbsp;' + masterAudioControl_pause + '&nbsp;' + masterAudioControl_forwardTwoSec + '&nbsp;' + masterAudioControl_forwardiveSec;

      //show buttons
      $('.podcastAudioArea').append('</br>' + masterAudioControl_all);

    //Button Functions
      //play (use event deligation to listen for this button being clicked and then activate)
      $('div').on('click', '#masterAudioControl_play', function(){
        var audio = $("#audioPlayer");
            audio.trigger('play');
      });

      //pause
      $('div').on('click', '#masterAudioControl_pause', function(){
        var audio = $("#audioPlayer");
            audio.trigger('pause');
      });

      //back two sec
      $('div').on('click', '#masterAudioControl_backTwoSec', function(){
        var audio = $("#audioPlayer");
            audio.trigger('pause');
            audio.prop("currentTime",audio.prop("currentTime")-1.1);
            audio.trigger('play');
      });


      //back five sec
      $('div').on('click', '#masterAudioControl_backFiveSec', function(){
        var audio = $("#audioPlayer");
            audio.trigger('pause');
            audio.prop("currentTime",audio.prop("currentTime")-2.1);
            audio.trigger('play');
      });

      //forward two sec
      $('div').on('click', '#masterAudioControl_forwardTwoSec', function(){
        var audio = $("#audioPlayer");
            audio.trigger('pause');
            audio.prop("currentTime",audio.prop("currentTime")+1.1);
            audio.trigger('play');
      });


      //forward five sec
      $('div').on('click', '#masterAudioControl_forwardiveSec', function(){
        var audio = $("#audioPlayer");
            audio.trigger('pause');
            audio.prop("currentTime",audio.prop("currentTime")+1.9);
            audio.trigger('play');
      });


  //Line Item (Show Note) Audio Controls
    $('.spewTime').on('click', '#notePlayButtonCell', function(event){

      //grab line count via 'spewCount' of event, we'll use this to figure out the play time from the 2nd <td> in the row
      var spewCountMemory =  $(this).attr('spewCount');

      //test, is this registering?
      console.log('spewCountMemory is: '+ spewCountMemory);

      //Get play time directly from the 2nd <td>
      cellTime = $('#noteTimeCell_spewCount_'+spewCountMemory).html();

      //test for finite
      if(isFinite(cellTime)){
        //delete test | console.log('its finite')

      }else{
    //
        //if notFinite turn into seconds
        cellTime = moment.duration(cellTime).asSeconds();
        console.log('it wasnt finite but is now');
        //$('.podcastAudioArea').prepend('cell Time is currently '+ cellTime+ ' </br>its NOT!!! Finite!');
      }

        //test that correct times are coming through
          //$('.podcastAudioArea').append(cellTime);
          //$('.podcastAudioArea').append(cellTime);

        //control play time
        document.getElementById('audioPlayer').play();
        document.getElementById('audioPlayer').currentTime=(cellTime);

    });
//delete twttr.widgets.load(); 
});

var twitterFunction = function(){  
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
     
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
 
      return t;
    }(document, "script", "twitter-wjs"));
}();