/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var OrdenesEvents = require('./ordenes.events');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('ordenes:' + event, socket);

    OrdenesEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));

    console.log("============================================");
    console.log("event registered: " + event);
    console.log("============================================");
    console.log("listener registered: " + listener);
    console.log("============================================");
  }
};


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
    console.log('Evento emitido: ' + event + '- ['+ doc +']');
  };
}

function removeListener(event, listener) {
  return function() {
    OrdenesEvents.removeListener(event, listener);
  };
}
