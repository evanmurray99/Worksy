const bcrypt = require('bcrypt');
const User = require('../models/User'); // assuming you have a User model

async function authenticateUser(username, password) {
    // find the user by their username
    const user = await User.findOne({ username });

    // if the user doesn't exist, return false
    if (!user) {
        return false;
    }

    // compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if the passwords match, return the user object
    if (passwordMatch) {
        return user;
    }

    // otherwise, return false
    return false;
}



