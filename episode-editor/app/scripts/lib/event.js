//An event is a thing peple can listen for and that you can trigger 
//This file is used to listen for when a thing happened and let parts of the code know it just happened

(function() {
  'use strict';

  // Constructor for an event dispatcher
  // output is a new event object which can be assigned to a variable
  // has name and call back properties
  function Event(name) {
    //this prt isn't used yet
    this.name = name;
    
    //this is the list of functions that care about our event
    this.callbacks = [];
  }

  //Takes a function "cb" and adds it to the callbacks list
  Event.prototype.addCallback = function(cb) {
    this.callbacks.push(cb);
  };

//This lets us go throug the list generated in Event(name) via this.callbacks
//it calls each function in the list 
  Event.prototype.dispatch = function(eventArgs) {
    this.callbacks.forEach(function(cb) {
      cb(eventArgs);
    });
  };

  //This puts Event() function into global podly object
  podly.Event = Event;
})();
