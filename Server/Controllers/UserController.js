const User = require('../Models/User');
const mongoose = require("mongoose") // 
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const createUser = async (req, res) => {
  try {
    const { firstName , lastName, email , password , isStudent } = req.body; 
    const bio = ''
    const notifications = []
    const bookmarks = []
    const orders = []
    const services = []
    const chats = []
    
    // Create a new user document and hash the password
    // To check password use: await bcrypt.compare(password, hashedPassword)
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);



    const newUser = new User(
      { firstName ,
        lastName, 
        email, 
        hashedPassword,
        bio,
        isStudent,
        notifications,
        services,
        chats,
        bookmarks,
        orders,
      });
    
    // Save the user to the database
    await newUser.save();
    
    res.status(201).json(newUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; 

    // Check if the provided ID is valid
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Attempt to find and delete the user by ID
    const deletedUser = await User.findByIdAndRemove(userId);

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserBio = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameter
    const { bio } = req.body; // Get the updated bio from the request body

    // Check if the provided ID is valid
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Attempt to find and update the user by ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true } 
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user bio by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const controller  = {
     getUser,
     createUser,
     deleteUserById,
     updateUserBio,
     
}

module.exports = controller;