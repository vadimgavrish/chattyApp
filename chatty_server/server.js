const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);
  });
};



wss.on('connection', (ws) => {
  console.log('Client connected');

  let userAdd = {
    type: 'userCount',
    users: wss.clients.size
  }

  wss.broadcast(JSON.stringify(userAdd));

  ws.on('message', function incoming(message) {

    let incomingMessage = JSON.parse(message);

    const newMessage = {
      type: incomingMessage.type,
      id: uuidv4(),
      username: incomingMessage.username,
      content: incomingMessage.content
    }

    wss.broadcast(JSON.stringify(newMessage));
  });

  ws.on('close', () => {

    let userReduce = {
      type: 'userCount',
      users: wss.clients.size
    }

    wss.broadcast(JSON.stringify(userReduce));
    
    console.log('Client disconnected');
  });
});
