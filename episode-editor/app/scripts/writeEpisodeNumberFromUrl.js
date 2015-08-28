$(document).ready(function() {

  $('.episodeNumberTest').append("hey bro!");
  console.log("hello");
  //initilizing variables
    //var query = window.location.search; // Gets '?foo=bar' from http://example.com/page.html?foo=bar
    //var hash = window.location.hash; // Gets '#foo' from http://example.com/page.html#foo

	//search for hash
		var search = window.location.search; // Gets '?foo=bar' from http://example.com/page.html?foo=bar
    console.log('search before operation is: '+ search);
    //remove #
    	search=search.replace('?','')
    
    //convert # to number
    	var searchTime = Number(search); 

    //confirm search is removed
    	console.log('search after operation is: '+ searchTime);

    //update DOM with search
    $('.episodeNumberTest').append("<p></p>Episode number: "+search);

    //save episodeNumberToSession
   



});