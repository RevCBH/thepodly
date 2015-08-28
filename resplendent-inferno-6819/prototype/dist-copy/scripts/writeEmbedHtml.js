//Tests

//4) write 1st line of data table 
//5) write all of table
//6) write new file with just embed

$(document).ready(function() {

	//initialize firebase variables 
      var rootUrl = 'sky-jump-run.firebaseIO.com/'; 
      var myDataRef = new Firebase(rootUrl);
      
      var episodesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/'; 
      var episodesRef = new Firebase(episodesUrl); 

    //episode specific variables
      var newEpisodeNumber = 22;
      var nameOfEpisode;
      var infoShow;
      var audioSource;
      var audioPlayer;

    //table stuff
   	  var episode22NotesUrl = 'https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes';
	  var episode22NotesRef = new Firebase(episode22NotesUrl);     

/*
    //table html
      var tableTop = '<table id="myTable" class="table table-hover"> <caption>Show Notes for Episode ' + newEpisodeNumber +  '</caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>words</th> <th>url</th><th>&nbsp;</th></thead>';
      var tableBot ='</tbody></table>';
    	

    //Grab episode name from Firebase 
    	episodesRef.child(newEpisodeNumber).once("value", function(snapshot) {
        document.open();
          //console.log(snapshot.val())
          infoShow = snapshot.val();    
          console.log('<h1>Hello World</h1><p>Episode Name: '+ infoShow.episodeName +'</p>');
          nameOfEpisode = infoShow.episodeName;
          audioSource = infoShow.podcastUrl;
          audioPlayer = '<audio controls preload="load" id="audioPlayer"><source src="' + audioSource + '" type="audio/mpeg"></audio>';
          var magicText = '<h4>Heal Yourself Radio</h4><p>Episode: '+newEpisodeNumber +' | '+  nameOfEpisode +'</p>' + audioPlayer;
          //document.write('<h4>Heal Yourself Radio</h4><p>Episode: '+newEpisodeNumber +' | '+  nameOfEpisode +'</p>' + audioPlayer);          
     */     //var demo = '<!doctype html> <html class="no-js" lang=""> <head> <meta charset="utf-8"> <title>Heal Yourself Radio</title> <meta name="description" content=""> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="shortcut icon" href="/favicon.ico"> <link rel="apple-touch-icon" href="/apple-touch-icon.png"> <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> <!-- build:css(.) styles/vendor.css --> <!-- bower:css -- <!-- endbower --> <!-- endbuild --> <!-- build:css(.tmp) styles/main.css --> <link rel="stylesheet" href="styles/main.css"> <!-- endbuild --> <!-- build:js scripts/vendor/modernizr.js --> <script src="bower_components/modernizr/modernizr.js"></script> <!-- endbuild --> <!-- infoNav.css is used to style firebase info --> <link rel="stylesheet" href="styles/infoNav.css"> </head> <body> <!--[if lt IE 10]> <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p> <![endif]--> <div class="container"> <div class="header">' + magicText + ' <!-- End panel body --> </div> <!-- End panel --> </div> <!-- build:js(.) scripts/vendor.js --> <!-- bower:js --> <script src="/bower_components/modernizr/modernizr.js"></script> <script src="/bower_components/jquery/dist/jquery.js"></script> <script src="/bower_components/firebase/firebase.js"></script> <!-- endbower --> <!-- endbuild --> <!-- build:js(.) scripts/plugins.js --> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js"></script> <!-- endbuild --> <!-- build:js scripts/main_showNotesTable.js --> <script src="scripts/main_showNotesTable.js"></script> <!-- endbuild --> <!-- build:js scripts/main.js --> <script src="scripts/main_V2.js"></script> <!-- endbuild --> <!-- build:js scripts/podcastTitle.js (displays the title of the podcast) --> <script src="scripts/podcastTitle.js"></script> <!-- endbuild --> <!-- build:js scripts/main_podcastUrl.js (handles read/write of podcast URL) --> <script src="scripts/main_showNotes.js"></script> <!-- endbuild --> <script src = "scripts/main_showNotesPlayButton.js"></script> <script src="bower_components/howler.js/howler.js"></script> <!-- build:js scripts/addSection.js (this adds a section to the podcast DB for "title") <script src="scripts/addSection.js"></script> <!-- endbuild --> <!-- build:js scripts/createDemoPodcast.js <script src="scripts/createPodcastBranch.js"></script> <!-- endbuild --> </script> </body> </html>';
			var demo = '<!doctype html> <html class="no-js" lang=""> <head> <meta charset="utf-8"> <title>Heal Yourself Radio</title> <meta name="description" content=""> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="shortcut icon" href="/favicon.ico"> <link rel="apple-touch-icon" href="/apple-touch-icon.png"> <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> <!-- build:css(.) styles/vendor.css --> <!-- bower:css -- <!-- endbower --> <!-- endbuild --> <!-- build:css(.tmp) styles/main.css --> <link rel="stylesheet" href="styles/main.css"> <!-- endbuild --> <!-- build:js scripts/vendor/modernizr.js --> <script src="bower_components/modernizr/modernizr.js"></script> <!-- endbuild --> <!-- infoNav.css is used to style firebase info --> <link rel="stylesheet" href="styles/infoNav.css"> </head> <body> <!--[if lt IE 10]> <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p> <![endif]--> <div class="container"> <div class="header"> <div class="timeTablePractice"></div> <div class="spewTime">This text should be erased</div> <div class="myTable2"></div> <!-- End panel body --> </div> <!-- End panel --> </div> <!-- build:js(.) scripts/vendor.js --> <!-- bower:js --> <script src="/bower_components/modernizr/modernizr.js"></script> <script src="/bower_components/jquery/dist/jquery.js"></script> <script src="/bower_components/firebase/firebase.js"></script> <!-- endbower --> <!-- endbuild --> <!-- build:js(.) scripts/plugins.js --> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js"></script> <script src="/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js"></script> <!-- endbuild --> <!-- build:js scripts/main_showNotesTable.js --> <script src="scripts/main_showNotesTable.js"></script> <!-- endbuild --> <!-- build:js scripts/main.js --> <script src="scripts/main_V2.js"></script> <!-- endbuild --> <!-- build:js scripts/podcastTitle.js (displays the title of the podcast) --> <script src="scripts/podcastTitle.js"></script> <!-- endbuild --> <!-- build:js scripts/main_podcastUrl.js (handles read/write of podcast URL) --> <script src="scripts/main_showNotes.js"></script> <!-- endbuild --> <script src = "scripts/main_showNotesPlayButton.js"></script> <script src="bower_components/howler.js/howler.js"></script> <script src="scripts/writeTableOnly.js"></script> <!-- build:js scripts/addSection.js (this adds a section to the podcast DB for "title") <script src="scripts/addSection.js"></script> <!-- endbuild --> <!-- build:js scripts/createDemoPodcast.js <script src="scripts/createPodcastBranch.js"></script> <!-- endbuild --> </body> </html>';
		document.write(demo);
		//document.write('<script> $(".header").prepend("Jolly Roger!!!");</script>');
		//document.write('<script> $(".header").append("Jolly Roger!!!");</script>'); 
		//document.close();

      	});


	








//});


/*/function to write Episode Data to DOM
      var episodeInfoWrite = function(newEpisodeNumber){
        
        //2) Write to the DOM in episodeInfoAdd
        episodesRef.child(newEpisodeNumber).once("value", function(snapshot) {
          var infoShow = snapshot.val();    
          $('.episodeInfoAdd').append(
            //"<hr>" +   
            "<h4>" + "Episode " + newEpisodeNumber + " - " + infoShow.episodeName + "</h4>");
          
        //3) Write to the DOM in episodeDescriptionAdd
          $('.episodeDescriptionAdd').append(
            infoShow.episodeDescription);
            //console.log(snapshot.val());

          //4 Append Edit Button in DOM
          $('.episodeEditButtonArea').show();

        }
 //*/