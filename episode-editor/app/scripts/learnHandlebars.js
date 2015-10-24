//In this document, delete_testHandlebars.js
//we do two things
//1) learn handlebars 


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




