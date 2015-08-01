// jshint devel:true


$(document).ready(function() {

  //create firebase reference
  var url = 'sky-jump-run.firebaseIO.com'; 
  var myDataRef = new Firebase(url);


  //Code that works
  myDataRef.set("test");
  


  // Attach an asynchronous callback to read the data at our posts reference
  myDataRef.on("value", function(snapshot) {
  var infoShow = snapshot.val(); 

  $('.infoTest').append(infoShow); 

  console.log(snapshot.val());
  
  //Error code, appears in Console if read failed 
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);

  });

//test that code ran
//prompt("Your code ran"); 




//End brakets / pares / ;   
});






$(document).ready(function() {

  
  // Setup Bootstrap tab handlers for the navigation pills in
  // the page header
  $('#header-nav li a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
