// Server.js
const express = require('express');
const app = require("./app");
const connectDB = require('./Config/db'); // Import the connectDB function
const config = require('./Config/keys')


// ...

// Connect to the database
connectDB()
  .then(() => {
    // Start your Express server here or define your routes
    app.listen(config.PORT, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Server failed to start', error);
  });

  