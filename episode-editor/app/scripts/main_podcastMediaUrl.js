/* Notes

This doc, main_podcastAudio.js, collects podcastUrl info and writes it to the database 
  
  How it works
    0) code detects if the current Episode # has a podcast URL associated with it
    1) If it ^ does, the url is shown along with an edit button, audio player is shown below that
    1) If it ^^ doesn't, user is prompted to enter a podcast URL 
      
    1) we write that to the database & deal with errors 
    
  The code below is seperated into 3 parts
    
    0)initilize a) variables & b) functions
    
    1) call starting functions & conditions 
      a) hide podcastAudioArea
      b) load & hide podcast url form & edit button 
    
    2) [Button] clicks
      a) [Button] Podcast URL (click) = write to Firebase
      b) [Button] Podcast URL Edit (click) = edit Podcast URL
*/

// jshint devel:true

podlyGlobal.podcastMediaUrl = function(){

//Part 0) initilizing variables & funcitons
  //part 0a) initilizing variables
  
    var podcastUrl;
      
    //podcast media
    //var showPodcastUrlForm = '<hr><h4>Enter Podcast URL</h4><form class="form-inline"><div class="form-group"><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button></div></form>'
    var showPodcastUrlForm ='<hr><h4>Enter Podcast URL</h4><input type="url" class="form-control" placeholder="your podcast url" id="podcastUrlField"><button type="submit" class="btn btn-default" id="podcastUrlButton">Enter</button>';
    var podcastUrlEditButton = '<button type="submit" class="btn btn-default" id="podcastUrlEditButton">Edit URL</button>';


  //part 0b) initilizing functions
  
    //function to load 'Podcast URL form'
      var loadPodcastUrlForm = function(){     
        $('.podcastUrlForm').empty();
        //add's html podcast url form to DOM  
        $('.podcastUrlForm').append(showPodcastUrlForm);
        //hides podcast url form
        $('.podcastUrlForm').hide();
      };

    //function to load 'Podcast URL Edit Button '
      var loadPodcastUrlEditButton = function(){
        $('.podcastUrlEditButton').empty(); 
        //add's html podcast url 'edit' [button] to DOM  
        $('.podcastUrlEditButton').append(podcastUrlEditButton);
        //hides podcast url edit button
        $('.podcastUrlEditButton').hide();
      };
    
    //function to show 'Podcast URL and hide the input form'
      var showPodcastUrl = function(podcastUrl){
        //show podcast url edit button
        $('.podcastUrlEditButton').show();

        //show podcast URL
        $('.podcastUrl').prepend('<hr>' + '<h5>Episode # '+newEpisodeNumber+' Audio URL</h5> ' + podcastUrl);

        //hide podcast URL form
        $('.podcastUrlForm').hide();

        //set hidden podcastUrlField to value of podcastUrl
        $("input[id=podcastUrlField]").val(podcastUrl);

        //4) show Episode Notes Section
        $('.showEpisodeNotes').show();
      };

    //Shows Audio Player below episode Audio URL
      var showPodcastPlayer = function(podcastUrl){
        //$('.podcastAudioArea').append(podlyGlobal.audioPlayer(podcastUrl));
        $('.podcastAudioArea').show();  
        //call Audio Controls to show audio player
        podlyGlobal.audioControls(podcastUrl); 
        //call  Show Notes to show 
        
      };

    //shows URL field and enter button
      var setPodcastUrl = function(){
        $('.podcastUrlForm').show;
        $('.podcastUrlEditButton').show;
      };

    
    
    //asks user for podcast URL
      var askPodcastUrl = function(){
          $('.podcastAudioArea').empty();

          //empty podcast URL
          $('.podcastUrl').empty();

          //hide podcast 'edit URL' button
          $('.podcastUrlEditButton').hide();

          //show podcast URL form
          $('.podcastUrlForm').show();
      };

    var getPodcastUrl =function(){
    //load podcastUrl if it already exists for current episode
      
      //A) if current episode isn't 000, check Episode # to see if it has a podcastUrl
      //B) if it does have a podcast url, show it with edit button
      //C) if it doesn't have a podcast url, show podcastUrlForm  
    

    //heres the code... 
      //A) if current episode isn't 000, check Episode # to see if it has a podcastUrl
      if (newEpisodeNumber !=='000'){
        console.log('newEpisodeNumber is: '+newEpisodeNumber);
        //check Firebase for URL associated to episode
          // initilize variables 
            var refTempBuild = podlyGlobal.episodesUrl+newEpisodeNumber;
            var refT = new Firebase(refTempBuild); 
          
          //open up Firebase podcast episode number and look for the Podcast url
          refT.child('podcastUrl').once('value', function(snapshot) { 
            var url = snapshot.val(); 
          
            //if url !== null show current URL and trigger show notes
            if (url !== null){
            //if Episode # has podcast URL show it with edit button
              showPodcastUrl(url);
              showPodcastPlayer(url);
            }else{
              //else prompt user to enter new podcast URL 
              askPodcastUrl();
            }

          });
      }else{
      //else prompt user to enter new podcast URL 
        askPodcastUrl();
        setPodcastUrl();
      }
    };

    
//Part 1) calling starting functions and conditions 
  // clear out anthying in podcastAudio area
    $('.podcastUrlForm').empty(); 

  //part 1a) shows podcastAudioArea
    $('.podcastAudioArea').hide();

  //part 1b) Podcast Media
    //podcast url form | load & hide
      //loads podcast url form
        loadPodcastUrlForm();
      
        
    //podcast url edito button | load & hide
      //loads podcast url edit button
        loadPodcastUrlEditButton();
      
//*/


  getPodcastUrl();
  
  //Part 2) Button Clicks


   //part 2a) [Button] Enter Podcast URL (click) = write to Firebase
    $('#podcastUrlButton').click(function(){

      //A) takes input of 'Podcast URL' field and assignes it to newPodcastUrl
        podcastUrl=$("input[id=podcastUrlField]").val();

      //B) creates Firebase child under /episodes/# with podcast Url       
        //var pRef = podlyGlobal.episodesUrl
          var eRef = podlyGlobal.episodesRef.child(newEpisodeNumber);
          eRef.update({
            podcastUrl: podcastUrl
          });
        //setPodcastUrl();

      //C) manage transitiion from input state to showing podcast state   
        showPodcastUrl(podcastUrl);

        //show podcast player
        showPodcastPlayer(podcastUrl);
          
        

        //show Episode Notes Section
        $('.showEpisodeNotes').show();


      /* delte, moving to a function with the name above
        //show podcast url edit button
        $('.podcastUrlEditButton').show();

        //show podcast URL
        $('.podcastUrl').prepend('<hr>' + '<h5> Podcast URL: ' + podcastUrl + '</h5>');

        //hide podcast URL form
        $('.podcastUrlForm').hide();

        //4) show Episode Notes Section
        $('.showEpisodeNotes').show();
        */
    });


    //part 2b) [Button] Edit Podcast URL  (click) = edit Podcast URL
      $('#podcastUrlEditButton').click(function(){
        askPodcastUrl();
      });

//End brakets / pares / ;
};