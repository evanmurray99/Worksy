const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // 

router.get('/', async (req, res) => {
  try {
    const data = await User.find(); // 
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


  router.post('/', async (req, res) => {
    try {
      const { name, email , password } = req.body; // Assuming username and password in the request body
      
      // Create a new user document
      const newUser = new User({ name, email,  password });
      
      // Save the user to the database
      await newUser.save();
      
      res.status(201).json(newUser); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
