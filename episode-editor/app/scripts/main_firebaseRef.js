// *** CRITICAL UPDATE NEEDED *** Need to desipher which podcast this is from the UNIQUE URL# WE GIVE PODCASTERS (FOR NOW) ***

/* Notes
   This doc (main_firebaseRef.js) does 1 thing: Create Firebase References
  
  How it works
    0) set podcast ID in 'podlyGlobal.podcastID' by reading the # in the unique url 
    1) the rest is self explanitory 

*/

podlyGlobal.updatePID = function(a){
  pID.podcastName = a; 

  podlyGlobal.episodesUrl = podlyGlobal.rootUrl + 'podcasts/'+ pID.podcastName +'/episodes/';
  podlyGlobal.episodesRef = new Firebase(podlyGlobal.episodesUrl);
  podlyGlobal.episodeHighLevel(); 

};

podlyGlobal.mNum = function(podcastID){  

/* how it works
 1) read m# from URL
 2) assign podlyGlobal.podcastID to m#
 3) based on M3, find name of podcast
 4) assign name of podcast to podlyGlobal.podcastID
 5) test to see if this bitch works! 
*/

 

    //convert number to name
      var podcastName; 

    //connect to db, find number, return name
      var ref =  new Firebase(podlyGlobal.rootUrl + 'mnum/' + podcastID); 

      ref.on("value", function(snapshot){
        pID.podcastName = snapshot.val(); 
        podlyGlobal.updatePID(pID.podcastName);    
      }); 
}

//make an object, see if you can update it in the funciton 
  var pID = {
    podcastName: '', 
    podcastID: ''
  }; 
  

  podlyGlobal.embedHtml = 'https://storytime.tech/embed.html?'; 

  
  podlyGlobal.rootUrl = 'https://sky-jump-run.firebaseIO.com/';
  podlyGlobal.myDataRef = new Firebase(podlyGlobal.rootUrl);

  podlyGlobal.podcastID; 
  

  //part 1: Retrieve m# from URL

  //search for ?
    var search = window.location.search; // Gets '?foo=bar' from http://example.com/page.html?foo=bar
      console.log('search before operation is: '+ search);

    //remove ?
      search=search.replace('?','');

    //convert # to number
      podlyGlobal.podcastID = Number(search);

  podlyGlobal.mNum(podlyGlobal.podcastID);
  
  



  
(function() {
})();

