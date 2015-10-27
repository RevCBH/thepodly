/*Notes
  This doc (earlyAccess.js) assesses if there is a ? in the URL, and if there isn't they're sent to the earlyAccess page
  
  How it works
    0) if ? in url = !null then redirect to /splash/earlyAccess.html 
*/


$(document).ready(function() {

  var search = window.location.search; // Gets '?foo=bar' from http://example.com/page.html?foo=bar
  if(search == ""){
    window.location.replace("https://storytime.tech/splash/earlyaccess.html");
  }else{

  }

});