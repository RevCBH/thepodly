// jshint devel:true


$(document).ready(function() {

  //create firebase reference
  var rootUrl = Config.firebase.rootUrl;
  var titleUrl = rootUrl + 'demoPodcast/hyr/podcastName';

  //creates database reference to rootUrl
  var myDataRef = new Firebase(rootUrl);

  //creates database reference to demoPodcast
  var demoPodcastRef = new Firebase(titleUrl);

  //creates database reference to Podcast
  var usersRef = myDataRef.child('users');





  //save demoPodcastRef objects
  demoPodcastRef.set({
  	hyr: {
  		podcastName: 'Heal Yourself Radio',
      author: 'Jon Chung',
      notes: {
        time: '',
        title: '',
        url: ''
      }
  	}
  });
});
