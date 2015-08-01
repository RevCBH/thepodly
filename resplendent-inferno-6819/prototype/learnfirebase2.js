
$(document).ready(function() {

  //create firebase reference
  var url = 'sky-jump-run.firebaseIO.com/1'; 
  var myDataRef = new Firebase(url);


  //Code that works
  myDataRef.set({author: "Jon Chug"}})
  


  // Attach an asynchronous callback to read the data at our posts reference
  myDataRef.on("value", function(snapshot) {
  var infoShow = snapshot.val(); 

  $('.info').append(infoShow); 

  console.log(snapshot.val());
  
  //Error code, appears in Console if read failed 
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

  });

//test that code ran
//prompt("Your code ran"); 




//End brakets / pares / ;   
});

