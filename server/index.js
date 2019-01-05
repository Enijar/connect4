const path = require('path');
const http = require('http');
const express = require('express');
const config = require('./app/config');
const db = require('./app/db/index');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// Setup express middleware
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// All routes should return the index.html page, since we're using client-side routing
app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

server.listen(config.port, async () => {
  try {
    await db.sync();
  } catch (err) {
    console.error(err);
  }

  // Listen to and handle web socket connections
  io.on('connection', require('./app/socket/index'));
  console.info(`[info] Running on http://localhost:${config.port}`);
});
