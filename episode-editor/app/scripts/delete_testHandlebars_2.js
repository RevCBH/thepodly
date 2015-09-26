//In this document, delete_testHandlebars.js
//we do two things
//1) learn handlebars 
//2) learn templating


$(document).ready(function() {

  // Grab the template script
  var theTemplateScript = $("#epTest-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    "episodeTitle": "Episode 22: HOW TO START BIOHACKING - A BEGINNER’S GUIDE TO SELF -MEASUREMENT"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.content-placeholder').html(theCompiledHtml);

});




//Part 2) learn templating
$(document).ready(function() {

  //0)get template path (setting fixed here, will be dynamic)
    var templatePath = 'partials/episodes.html'; 
    var templateSet; 
    var tempTempTemp;
    //var testTemplate; 

  //load something from partials/episodes.html 
  //into .content-placeholder

  /*** 1) load something from index.html 
    var data = document.getElementById("epTest-template");
    console.log(data.outerHTML);*/

  //2) 


//Steps to displaying a specific part of a template
  //A) load template from path and HIDE IT
  //B) put template into memory with variable 
  //C) find data-state="x" w/ outerHTML and assign to new variable
  //D) display ^ in a non-hidden part of the dom 


//Part A) load template from path and HIDE IT
  //1) load something from templatePath (paritals/episodes.html) into #episode-list-panel
    $('#episode-list-panel-hide').hide(); 
    $('#episode-list-panel-hide').load(templatePath, function(){
      templateSet = $(this).html(); 
  //*** you are here, templateSet works in this funciton but not outside :P
    //maybe try reading the html directly from the <div> to set the variable? 
      tempTempTemp = templateSet; 
      console.log('templateSet 1: '+ templateSet); 
    });

  //3) writeHTML() ""-show and test it
      console.log('tempTempTemp: '+ tempTempTemp); 
      $('#episode-list-panel').html("<div> "+ tempTempTemp + "</div>"); 

  //4) move onto step B

      


  //show podcast URL
  $('.content-placeholder').append('Test');


});

























































































