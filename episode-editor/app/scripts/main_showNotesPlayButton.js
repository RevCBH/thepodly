// Test 4: hook up row play button to media O.O 
	//add media via FireBase
	//make it play via 


$(document).ready(function() {
	
//initialize variables
var audioPlayer = '<audio controls preload="load" id="audioPlayer"><source src="http://traffic.libsyn.com/healyourselfradio/biohacking_and_the_quantified_self.mp3" type="audio/mpeg"></audio>';




//starting code
	//write html into dom podcastAudioArea
	//$('.podcastAudioArea').append('<button type="submit" class="btn btn-default" id="playButton_spewCount_000">Audio Play Test</button>');
	$('.podcastAudioArea').append(audioPlayer);

	//use event deligation to listen for this button being clicked and then activate
	$('div').on('click', '#playButton_spewCount_1', function(){
		//$('.podcastAudioArea').append("1");
		var audio = $("#audioPlayer");
         audio.trigger('play');
        
	});


	


});		