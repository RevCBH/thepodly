/* 
 * This doc, 'delete_testRemoteFunction.js' tests if I can trigger a function from an external function
 * called from delete_globalVariableTest.js, 
 * ^ loaded after it in index.html
 */
//var global ={}; 

var newEpisodeNumber = '000'; 

/*
 These are test variables
	var newEpisodeNumber1 = '001';
	var newEpisodeNumber2 = '002';
	var newEpisodeNumber3 = '003';



	podlyGlobal.getEpisodeNumber = function(){
		return newEpisodeNumber; 
	};


	podlyGlobal.episodeNumber3 = function(){
	  //newEpisodeNumber; 
	  console.log('local : newEpisodeNumber3 ' + newEpisodeNumber3);
	  return newEpisodeNumber3; 
	};



	podlyGlobal.episodeNumber2 = function(){
	  //newEpisodeNumber2; 
	  console.log('local : newEpisodeNumber2 ' + newEpisodeNumber2);
	  return newEpisodeNumber2; 
	};


	podlyGlobal.episodeNumber1 = function(){
		//newEpisodeNumber; 
		console.log('local : newEpisodeNumber1 ' + newEpisodeNumber1);
		return newEpisodeNumber1; 
	};


	podlyGlobal.testFunction2 = function(){
		console.log('testFunction2 works')
		//console.log('window.newEpisodeNumber: ' + window.newEpisodeNumber);
	};

	(function() {
	    //code here
	    window.testFunction = function(){
	     console.log("testFunction works");
	    };
	})();
*/