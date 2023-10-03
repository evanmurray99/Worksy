// Server.js
const express = require('express');
const app = require("./app");
const connectDB = require('./Config/db'); // Import the connectDB function


// ...

// Connect to the database
connectDB()
  .then(() => {
    // Start your Express server here or define your routes
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Server failed to start', error);
  });
