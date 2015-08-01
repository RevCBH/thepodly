var ref = new Firebase("https://resplendent-inferno-6819.firebaseio.com/6");

var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});

$(function() {
    // Put your firebaseRef.on call here!
    usersRef.on("value", function(snap) {
    // snap.val() will contain the JS object.
        $("#result").html(
          JSON.stringify(snap.val())
        );
    });
});   
//test that code ran
  prompt("Your code ran"); 