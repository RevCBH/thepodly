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


    //table html
      var tableTop = '<table id="myTable" class="table table-hover"> <caption>Show Notes for Episode ' + newEpisodeNumber +  '</caption> <tbody> <thead> <tr> <th> &nbsp; </th> <th>time</th> <th>words</th> <th>link</th><th>tweet</th></thead>';
      var tableBot ='</tbody></table>';
 


     

      // starting code
      

	//Start Table magic
	//Organise the data in to a table	
	
	//1st we load the table data (middle of table) from firebase
	var ref2 = new Firebase("https://sky-jump-run.firebaseio.com/podcasts/healyourselfradio/episodes/22/episodeNotes");
	ref2.on("value", function(snapshot) {
		$('.spewTime').empty(); 
	  	//add table header 
		$('.spewTime').prepend(tableTop);

	  //initilize spewCounter which we'll use to create key references to each row's ID's
	  var spewCounter = 0;

	  var thingy='www.a.com'; 

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
		var tableGuts = '<tr class = "' + classToggle +'" id="spewCount_' + spewCounter +'"> <div class="row"> <td id="notePlayButtonCell" spewCount="'+spewCounter+'"> <button type="button" class="btn btn-default btn-sm" id="playButton_spewCount_'+ spewCounter +'"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button> </td> <td id="noteTimeCell_spewCount_'+spewCounter+'">' + childSnapshot.key() + '</td> <td id="noteWordsCell">' + childSnapshot.val().noteWords + '</td> <td id="noteUrlCell">' + addUrl(childSnapshot.val().noteUrl)  + '<td>&nbsp;</td></div> </tr>';
	  	$("#myTable").find('tbody').append($(tableGuts));	  		
	  });	  
	  	

	  	//table close (bottom)
		$("#myTable").find('tbody').append($(tableBot));	  	

	
	  //re-load #mainCss to re-style page
	  $("head").append($('<link rel="stylesheet" href="styles/main.css" type="text/css" media="screen" />'));
	
	// ending code
      addUrl(thingy);   

	});	
	


});