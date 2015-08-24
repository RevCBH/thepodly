// Test 4: hook up row play button to media O.O 
	//add media via FireBase
	//make it play via 


$(document).ready(function() {
	
//initialize variables
var audioSource= 'http://traffic.libsyn.com/healyourselfradio/biohacking_and_the_quantified_self.mp3';
var audioPlayer = '<audio controls preload="load" id="audioPlayer"><source src="' + audioSource + '" type="audio/mpeg"></audio>';




	//starting code
		//write html into dom podcastAudioArea
		//$('.podcastAudioArea').append('<button type="submit" class="btn btn-default" id="playButton_spewCount_000">Audio Play Test</button>');
		$('.podcastAudioArea').append('<h4>Episode Media</h4>' + audioPlayer);


	//Master Audio Controls
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

});		