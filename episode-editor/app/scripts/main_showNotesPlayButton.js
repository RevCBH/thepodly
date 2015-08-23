// Test 4: hook up row play button to media O.O 
	//play via button click 
	//add media via FireBase
	//make it play via 


$(document).ready(function() {
	
//initialize variables
var audio = new Audio('<audio controls preload="load"><source src="http://traffic.libsyn.com/healyourselfradio/biohacking_and_the_quantified_self.mp3" type="audio/mpeg"></audio>');
audio.play();

//starting code
	//write html into dom podcastAudioArea
	$('.podcastAudioArea').append(audio + '<button type="submit" class="btn btn-default" id="playButton_spewCount_000">Audio Play Test</button>');

	//use event deligation to listen for this button being clicked and then activate
	$('div').on('click', '#playButton_spewCount_1', function(){
		$('.podcastAudioArea').append("1");

	});

});		