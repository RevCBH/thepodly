// *** CRITICAL UPDATE NEEDED *** Need to desipher which podcast this is from the UNIQUE URL# WE GIVE PODCASTERS (FOR NOW) ***

/* Notes
   This doc (main_firebaseRef.js) does 1 thing: Create Firebase References
  
  How it works
    0) set podcast ID in 'podlyGlobal.podcastID' by reading the # in the unique url 
    1) the rest is self explanitory 

*/

    //**** Need to desipher which podcast this is from the UNIQUE URL# WE GIVE PODCASTERS (FOR NOW)***
 
    podlyGlobal.embedHtml = 'https://sky-jump-run.firebaseapp.com/embed.html?'; 

    podlyGlobal.podcastID = 'healyourselfradio';
    
    podlyGlobal.rootUrl = 'https://sky-jump-run.firebaseIO.com/';
    podlyGlobal.myDataRef = new Firebase(podlyGlobal.rootUrl);

    podlyGlobal.episodesUrl = podlyGlobal.rootUrl + 'podcasts/'+ podlyGlobal.podcastID+'/episodes/';
    podlyGlobal.episodesRef = new Firebase(podlyGlobal.episodesUrl);

  (function() {
  })();