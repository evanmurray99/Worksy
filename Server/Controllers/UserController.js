const User = require('../Models/User');
const Service = require('../Models/Service');
const mongoose = require("mongoose") // 
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
 
const saltRounds = 10;
const secretKey = "GBL9Df0RWIYcA4ZbYiBGjNESysa0AesF";

const generateToken = (user) => {
  const payload = {
    user : user
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
};

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

const addService = async (req, res) => {
  try {
    const userId = req.params.id;
    const serviceId = req.params.service;

    


    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.services.push(serviceId);
    await user.save();

    res.status(200).json({ message: 'Service appended to user' });
  } catch (error) {
    console.error('Error appending service to user:', error);
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
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new User(
      { firstName ,
        lastName, 
        email, 
        hashedpassword,
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

    res.status(500).json({ message: errorMap[error.code] });
  }
};

const editUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If a new password is provided, hash it
    if(password !== '')
    {
      if (!(await bcrypt.compare(password, user.hashedpassword))) {
        const saltRounds = 10; // Adjust the salt rounds as needed
        const salt = await bcrypt.genSalt(saltRounds);
        user.hashedpassword = await bcrypt.hash(password, salt);
      }
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error editing user:', error);
    res.status(500).json({ message: 'Internal server error' });
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      
    }

    
    const passwordMatch = await bcrypt.compare(password, user.hashedpassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    
    const token = generateToken(user);
    return res.status(200).json({ token : token});

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' , error : error });
  }
};

const getUserByToken = async (req, res) => {
  
  const token  = req.params.token;

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.user._id);

    if (!user) {
      
      return res.status(404).json({
        success: false,
        error: 'Unauthorized User',
      });
    }

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error('Error fetching user by token:', error);
    return res.status(500).json({
      success: false,
      error: 'Could not get User',
    });
  }
};

const getServices = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const serviceIds = user.services;

    const serviceObjects = await Service.find({ _id: { $in: serviceIds } });

    res.status(200).json(serviceObjects);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const errorMap = {
  '11000' : 'User with this email already exists'
}

const controller  = {
     getUser,
     getUserByToken,
     createUser,
     deleteUserById,
     updateUserBio,
     login,
     addService : addService,
     getServices : getServices,
     editUser : editUser
}

module.exports = controller;