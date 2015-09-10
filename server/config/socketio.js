/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function(data) {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/ordenes/ordenes.socket').register(socket);
  require('../api/producto/producto.socket').register(socket);
  require('../api/user/user.socket').register(socket);

}

module.exports = function(socketio) {
  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

/*    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };
*/
    // Call onDisconnect.
    socket.on('disconnect', function() {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
});
