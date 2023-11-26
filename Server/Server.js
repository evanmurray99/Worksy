// Server.js
const express = require('express');
const app = require("./app");
const http = require('http');
const db = require('./Config/db'); // Import the connectDB function
const dotenv = require('dotenv');
const cors = require('cors'); 


const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = new Map();


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user login event
  socket.on('login', (userId) => {
    // Associate the user ID with the socket ID
    console.log('User Logged In:', userId);
    userSocketMap.set(userId, socket.id);
  });

  socket.on('messageSent', (data) => {
    const { chat, senderId, message } = data;
    const recipientId = chat.buyer === senderId ? chat.seller : chat.buyer;
    const recipientSocketId = userSocketMap.get(recipientId);
    console.log(recipientId)
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('messageReceived', { senderId, message, chat });
    }
  });



  // Handle chat events
  socket.on('message', (data) => {
    const { senderId, recipientId, message } = data;

    // Retrieve the recipient's socket ID from the map
    const recipientSocketId = userSocketMap.get(recipientId);

    if (recipientSocketId) {
      // Send the message to the recipient's socket
      io.to(recipientSocketId).emit('message', { senderId, message });
    }
  });

  socket.on('disconnect', () => {
    // Remove the user ID from the map when a user disconnects
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  });
});

 
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// Connect to the database
db.connectDB()
  .then(() => {
    // Start your Express server here or define your routes
    app.listen(process.env.PORT, () => {
      console.log('API Server is running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Server failed to start', error);
  });


server.listen(3002, () => {
  console.log('Socket Server is running on port 3002');
});