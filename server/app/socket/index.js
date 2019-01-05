module.exports = socket => {
  require('./handlers/connection')(socket);
  socket.on('disconnect', require('./handlers/disconnect')(socket));
};
