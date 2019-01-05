import io from 'socket.io-client'
import handlers from './handlers'

export default {
  io,
  socket: null,
  connect() {
    this.socket = this.io.connect();

    for (let handler in handlers) {
      if (!handlers.hasOwnProperty(handler)) {
        continue;
      }
      this.socket.on(handler, handlers[handler](this.socket));
    }
  },
  disconnect() {
    for (let handler in handlers) {
      if (!handlers.hasOwnProperty(handler)) {
        continue;
      }
      this.socket.off(handler, handlers[handler](this.socket));
    }
    this.socket.disconnect();
  }
}
