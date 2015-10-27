/*Notes
  This doc (writeEmbedMagic.js) outputs Episode Header info and table to our Embed Template page.
  How it works
    0) embed.html/?X is served
    1) ?X gives us our Episode # (EP#) via writeEpisodeNumberFromUrl.js which saves the EP# in a session.
    2) This doc uses the EP# ^ to get Episode Header info (Episode Name, Description, etc) and the table of show notes.
    3) As EP data is retrieved from Firebase it's written to embed.html in realtime in each place it's served.  #Beautiful

  The code below is seperated into 5 parts
    0) initizlize variables
    1a) Retrieve Episode Number from URL
    1b) Use EpisodeNumber to set variables related to episodeNumber
    2) Display Episode Header from Firebase
    3) Display Episode Table from Firebase
*/

$(document).ready(function(){
//0: initalize variables

console.log("scripts/platformSpecific.js is working!!!"); 
$(".podcasterInfo").stick_in_parent();


});

