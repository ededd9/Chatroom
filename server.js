const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot'
const PORT = 3000 || process.env.PORT;

//Run when client connects
io.on('connection', socket => {
  // Welcome current user
  socket.emit('message', formatMessage(botName,'Welcome to ChatCord!'));

  // Broadcast when a user connect
  socket.broadcast.emit('message',formatMessage(botName ,'A user has joined the chat'));

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName,'A user has left the chat'));
  });

  //Listen for chatMessage
  socket.on('chatMessage', msg => {
    io.emit('message', formatMessage('USER',msg));
  });
});

server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT} `);
});