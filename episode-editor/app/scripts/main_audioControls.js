/**** NEED a global variable to signal that Podcast URL has been entered ***/

/**** Consider moving #hash functions to a seperate file****/

// Test 4: hook up row play button to media O.O 
	//add media via FireBase
	//make it play via 


//reinstate: $(document).ready(function() {
//reference: old name: podlyGlobal.showNotesPlayButton = function(){
podlyGlobal.audioControls = function(podcastUrl){
	
//initialize variables
	//need to set audio source from Podcast Audio URL field 
	//var audioSource= 'http://traffic.libsyn.com/healyourselfradio/biohacking_and_the_quantified_self.mp3';
	var audioPlayer = '<audio controls preload="load" id="audioPlayer"><source src="' + podcastUrl + '" type="audio/mpeg"></audio>';
	var cellTime; 
	var formatTime; 
	var hash=0;




//**** play magic as people come to page **** Allows us to know what section of the podcast we should jump to 
	//search for hash
		hash = window.location.hash; // Gets '#foo' from http://example.com/page.html#foo
    //console.log('hash before operation is: '+ hash);
    //remove #
    	hash = hash.replace('#','');
    
    //convert # to number
    	var hashTime = Number(hash); 


    //confirm hash is removed
    	// ***** reinstate | console.log('hash after operation is: '+ hashTime);


	//starting code
		//delete: hide podcastAudioArea until audio URL has been entered
		//delete: $('podcastAudioArea').hide;

		//write html into dom podcastAudioArea
		// delete | old note need a global variable to signal that Podcast URL (audioSource) has been entered
		 $('.podcastAudioArea').html('<h5>Podcast Audio</h5>' + audioPlayer);
		 //delete | audioPlayer.attr('autoplay','autoplay');
		
		

		//set hash to be playtime 
	    if(hashTime !=0 || hashTime !== ''){
	    	// ***** reinstate | console.log('hash is not equal to 0 or ""');
	    	cellTime = hashTime; 
			//document.getElementById('audioPlayer').play(); 
			document.getElementById('audioPlayer').currentTime=(cellTime);
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
		        console.log("hello");
		        event.stopPropagation()
			});

			//pause 
			$('div').on('click', '#masterAudioControl_pause', function(){
				var audio = $("#audioPlayer");
		        audio.trigger('pause'); 
		        event.stopPropagation()
			});

			//back two sec
			$('div').on('click', '#masterAudioControl_backTwoSec', function(){
				var audio = $("#audioPlayer");
		        audio.trigger('pause'); 
		        audio.prop("currentTime",audio.prop("currentTime")-1);
		        audio.trigger('play'); 
		        event.stopPropagation()
			});
		
			
			//back five sec
			$('div').on('click', '#masterAudioControl_backFiveSec', function(){
				var audio = $("#audioPlayer");
		        audio.trigger('pause'); 
		        audio.prop("currentTime",audio.prop("currentTime")-5);
		        audio.trigger('play'); 
		        event.stopPropagation()
			});

			//forward two sec
			$('div').on('click', '#masterAudioControl_forwardTwoSec', function(){
				var audio = $("#audioPlayer");
		        audio.trigger('pause'); 
		        audio.prop("currentTime",audio.prop("currentTime")+2);
		        audio.trigger('play'); 
		        event.stopPropagation()
			});
		
			
			//forward five sec
			$('div').on('click', '#masterAudioControl_forwardiveSec', function(){
				var audio = $("#audioPlayer");
		        audio.trigger('pause'); 
		        audio.prop("currentTime",audio.prop("currentTime")+5);
		        audio.trigger('play'); 
		        event.stopPropagation()
			});


	//Line Item (Show Note) Audio Controls	
		$('.spewTime').on('click', '#notePlayButtonCell', function(event){

			//grab line count via 'spewCount' of event, we'll use this to figure out the play time from the 2nd <td> in the row
			var spewCountMemory =  $(this).attr('spewCount');	
			
			//test, is this registering? 
			console.log('test test test');
			console.log('spewCountMemory is: '+ spewCountMemory);
			
			
			
				//Get play time directly from the 2nd <td> 
				cellTime = hmsToSecondsOnly($('#noteTimeCell_spewCount_'+spewCountMemory).html());  

				function hmsToSecondsOnly(str) {
				    var p = str.split(':'),
				        s = 0, m = 1;

				    while (p.length > 0) {
				        s += m * parseInt(p.pop(), 10);
				        m *= 60;
				    }

				    return s;
				}


				//test current cell time 
				console.log('cellTime is ' + cellTime);
		
			//test for finite
			if(isFinite(cellTime)){
				console.log('its Finite!');

			}else{
//********** You are here ***********/
				//if notFinite turn into seconds
				cellTime = moment.duration(cellTime).asSeconds();
				//$('.podcastAudioArea').prepend('cell Time is currently '+ cellTime+ ' </br>its NOT!!! Finite!');
			}

				//test that correct times are coming through 
				//$('.podcastAudioArea').append(cellTime);
				//$('.podcastAudioArea').append(cellTime);
				//control play time 
				//document.getElementById('audioPlayer').play(); 
				document.getElementById('audioPlayer').currentTime=(cellTime);
		
		
		/*show hours if there's enough time
		if(cellTime>=3600){
			formatTime = moment().startOf('day')
	        .seconds(cellTime)
	        .format('H:mm:ss')
	       }
	     //dont' show hours if there's not more than 60 mins 
	     else{
	       	formatTime = moment().startOf('day')
	        .seconds(cellTime)
	        .format('mm:ss')
	       }

		/////test writing time in mm:ss
		//$('.podcastAudioArea').append('<p>Jello!</p>');		
		*/
		

		});

		

//reinstate });		
//delete
};






// put this back in the row html if needed _spewCount_'+ spewCounter +'