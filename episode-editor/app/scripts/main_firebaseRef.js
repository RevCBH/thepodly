

 //create firebase references
    //**** Need to desipher which podcast this is from the UNIQUE URL# WE GIVE PODCASTERS (FOR NOW)***

    podlyGlobal.podcastID = 'healyourselfradio';
    
    podlyGlobal.rootUrl = 'https://sky-jump-run.firebaseIO.com/';
    podlyGlobal.myDataRef = new Firebase(podlyGlobal.rootUrl);

    podlyGlobal.episodesUrl = podlyGlobal.rootUrl + 'podcasts/'+ podlyGlobal.podcastID+'/episodes/';
    podlyGlobal.episodesRef = new Firebase(podlyGlobal.episodesUrl);

  (function() {
  	console.log("podlyGlobal.episodesRef is " + podlyGlobal.episodesRef);
  	console.log("podlyGlobal.episodesUrl is " + podlyGlobal.episodesUrl);
  })();