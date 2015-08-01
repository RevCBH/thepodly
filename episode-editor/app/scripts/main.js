// jshint devel:true

$(document).ready(function() {

  //create firebase reference
  var url = 'sky-jump-run.firebaseIO.com'; 
  var firebaseRef = new Firebase(url);

  // Setup Bootstrap tab handlers for the navigation pills in
  // the page header
  $('#header-nav li a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
