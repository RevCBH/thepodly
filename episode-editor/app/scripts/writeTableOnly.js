$(document).ready(function() {
  //initialize firebase variables
      var rootUrl = Config.firebase.rootUrl;
      var myDataRef = new Firebase(rootUrl);

      var episodesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/';
      var episodesRef = new Firebase(episodesUrl);

    //initialize episode specific variables
      var newEpisodeNumber = 22;
      var nameOfEpisode;
      var infoShow;

    //initialize base URL
       var baseUrl = 'https://resplendent-inferno-6819.firebaseapp.com/prototype/dist-copy/hyr_22.html';

      //var audioSource;
      //var audioPlayer;

    //initialize table stuff
      var episode22NotesUrl = rootUrl + 'podcasts/healyourselfradio/episodes/22/episodeNotes';
      var episode22NotesRef = new Firebase(episode22NotesUrl);

    //initialize table html
      var tableTop = '<table id="myTable" class="table table-hover"> <caption>Show Notes for Episode ' + newEpisodeNumber +  '</caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>words</th> <th>link</th><th>tweet</th></thead>';
      var tableBot ='</tbody></table>';


      // starting code

      //


  //Start Table magic

  //1st we load the table data (middle of table) from firebase
    var ref2 = new Firebase("https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes");
    ref2.on("value", function(snapshot) {
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
        var cellTime = seconds;
        var formatTime = moment().startOf('day')
              .seconds(cellTime)
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

        //class toggle (even = info, odd = )
        if(spewCounter%2==0){
          var classToggle = 'info';
        }else{
          classToggle = '';
        }

        //create rows in the table

        var twitterDrop='<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+ baseUrl + '#' +childSnapshot.key() +'" data-text="'+ childSnapshot.val().noteWords +'" data-count="none">Tweet</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>';
      var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell" spewCount="'+spewCounter+'"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell_spewCount_'+spewCounter+'">' + timeClean(childSnapshot.key())  + '</td> <td id="noteWordsCell">' + childSnapshot.val().noteWords+'</td> <td id="noteUrlCell">' + addUrl(childSnapshot.val().noteUrl)  + '<td>'+ twitterDrop +'</td></div> </tr>';
        $("#myTable").find('tbody').append($(tableGuts));
        //$("#hideOldTime").hide();
        //$("#showNewTime").show();
        //console.log(timeClean(2123));
      });


        //table close (bottom)
      $("#myTable").find('tbody').append($(tableBot));


      //re-load #mainCss to re-style page
      $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));

    // ending code
        //addUrl(thingy);

    });







//});





});


