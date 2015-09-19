(function() {
  'use strict';

  // Prototype for an event dispatcher
  function Event(name) {
    this.name = name;
    this.callbacks = [];
  }

  Event.prototype.addCallback = function(cb) {
    this.callbacks.push(cb);
  };

  Event.prototype.dispatch = function(eventArgs) {
    this.callbacks.forEach(function(cb) {
      cb(eventArgs);
    });
  };

  podly.Event = Event;
})();
