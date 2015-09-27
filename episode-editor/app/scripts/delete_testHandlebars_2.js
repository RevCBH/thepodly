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




//Part 2) learn templating
$(document).ready(function() {

  //0)get template path (setting fixed here, will be dynamic)
    var templatePath = 'partials/episodes.html'; 
    var templateSet; 
    var orig;
    var cloned;



//Steps to displaying a specific part of a template
  //A) load template from path into a hidden div
  //B) clone the specific part of the template and show it 


//Part A) load template from path and HIDE IT
  //1) load something from templatePath (paritals/episodes.html) into #episode-list-panel
    $('#episode-list-panel-hide').hide(); 
    $('#episode-list-panel-hide').load(templatePath, function(){
      templateSet = $(this).html(); 
      
      //delete: confirms template is loading
        //console.log('templateSet 1: '+ templateSet); 
      
      
  //Part B) clone the specific part of the template
      var orig = $('#episode-list-panel-hide').find('[data-state="list"]').clone();
      console.log('orig = ' + orig); 
      var cloned = $(orig).clone().show();
      $('#episode-list-panel-show').html(cloned); 

    });
      


  //show podcast URL
  $('.content-placeholder').append('Test');


});

























































































