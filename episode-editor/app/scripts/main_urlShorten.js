/*
	We're makign a global function that can convert looooooong links into pretty little bit.ly links 
*/ 
podlyGlobal.urlShortener = function(){  
	

	//steps: convert url --> 'percent-encoding' --> bit.ly

	//step 1: convert programatically make a basic bit.ly

console.log("outertest"); 

	function getShortUrl(url, callback){
		console.log("is anythign working???"); 

	   var accessToken = 'f601d9565a3a86214a25aeb47975962bbd8f579d';
	   var url = 'https://api-ssl.bitly.com/v3/shorten?access_token=' + accessToken + '&longUrl=' + encodeURIComponent(url);

	    $.getJSON(
	        url,
	        {},
	        function(response){
	            if(callback)
	                callback(response.data.url);
	            	console.log('if happened'); 
	        	console.log('function(response) happened'); 
	        }
	       //console.log('$.getJson happened'); 
	    );
	}; 

	getShortUrl('http://www.google.com'); 


/*

	function get_short_url(long_url, login, api_key, func){
	    $.getJSON(
	        "http://api.bitly.com/v3/shorten?callback=?", 
	        { 
		        "format": "json",
	            "apiKey": api_key,
	            "login": login,
	            "longUrl": long_url
	        },
	        function(response)
	        {
	            func(response.data.url);
	        }
	    );
	}; 

		/*
		Sign up for Bitly account at
		 https://bitly.com/a/sign_up

		and upon completion visit
		https://bitly.com/a/your_api_key/ 
		to get "login" and "api_key" values
		*
		var login = "o_1nkaogm2fc";
		var api_key = "R_f2be2b340e77c3222767b1cd13af73d0";
		var long_url = "http://www.kozlenko.info";

		get_short_url(long_url, login, api_key, function(short_url) {
		    console.log(short_url);
		});
	*/

}(); 