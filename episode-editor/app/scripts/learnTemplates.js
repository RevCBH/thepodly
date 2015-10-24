/* This document, learnTemplate.js, does 1 thing 
  Demo how to load a specific part of a template into our episode-editor

  There are X Steps to making it work
  0) initilize variables
  1) load template from path into a hidden div
  2) clone a specific part of the template and show it 

*/



$(document).ready(function() {

//Part 0)get template path (setting fixed here, will be dynamic)
    var templatePath = 'partials/episodes.html'; 
    var data = 'list'; 
    var templateSet; 
    var orig;
    var cloned = "Test";
    var og; 




//Part 1) load template from path and HIDE IT
  //A First we hid the div we'll be loading everything into
  $('#episode-list-panel-hide').hide(); 
    
  //B then we fill the hidden div with the full template html
  $('#episode-list-panel-hide').load(templatePath, function(){
    //templateSet = $(this).html();  
    
    //C) next we clone the template snippet we want to display... 
    orig = $('#episode-list-panel-hide').find('[data-state="' + data + '"]').clone();
    //& assign it to a variable
    cloned = $(orig).clone().show();

    og = "t";
      
    //D) then we show the cloned snippet 
    $('#episode-list-panel-show').html(cloned);   

  });
  console.log(og); 
  


});









































































































































































