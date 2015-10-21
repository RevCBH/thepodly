/*
	We're makign a global function that show audio is loading 
*/ 
podlyGlobal.audioLoading = function(){  
	
	//add spot on page for spinner to show up

	var cl = new CanvasLoader('canvasloader-container');
		cl.setColor('#6cc5f5'); // default is '#000000'
		cl.setDiameter(27); // default is 40
		cl.setDensity(84); // default is 40
		cl.setRange(0.9); // default is 1.3
		cl.setSpeed(1); // default is 2
		cl.setFPS(60); // default is 24
		cl.show(); // Hidden by default
}(); 