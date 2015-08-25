// Test 4: hook up row play button to media O.O 
	//add media via FireBase
	//make it play via 


$(document).ready(function() {
	
//initialize variables
var audioSource= 'http://traffic.libsyn.com/healyourselfradio/biohacking_and_the_quantified_self.mp3';
var audioPlayer = '<audio controls preload="load" id="audioPlayer"><source src="' + audioSource + '" type="audio/mpeg"></audio>';
var cellTime; 
var formatTime; 



	//starting code
		//write html into dom podcastAudioArea
		$('.podcastAudioArea').append('<h4>Episode Media</h4>' + audioPlayer);

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
			
			//console.log('spewCountMemory is: '+ spewCountMemory);
			
			//Get play time directly from the 2nd <td> 
				cellTime = $('#noteTimeCell_spewCount_'+spewCountMemory).html();  
				
				//test that correct times are coming through 
				//$('.podcastAudioArea').append(cellTime);
				//$('.podcastAudioArea').append(cellTime);
				//control play time 
				document.getElementById('audioPlayer').play(); 
				document.getElementById('audioPlayer').currentTime=(cellTime);
		
		
		//show hours if there's enough time
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
		//$('.podcastAudioArea').append('<p></p>'+formatTime);		

		

		});

		

});		






// put this back in the row html if needed _spewCount_'+ spewCounter +'