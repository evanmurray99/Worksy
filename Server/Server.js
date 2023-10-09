// Server.js
const express = require('express');
const app = require("./app");
const connectDB = require('./Config/db'); // Import the connectDB function
const dotenv = require('dotenv');
 
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });



// Connect to the database
connectDB()
  .then(() => {
    // Start your Express server here or define your routes
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Server failed to start', error);
  });

