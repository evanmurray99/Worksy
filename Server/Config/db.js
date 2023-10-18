
const mongoose = require('mongoose');
const dotenv = require('dotenv');
 
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const db = process.env.MONGO_URI


// Database connection function
//this should allow everyone access 
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(db ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGODB_DB,
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Connection failed', err);
    process.exit(1); // Exit the process with an error code
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Closed database connection');
  } catch (err) {
    console.error('Error closing database connection', err);
  }
};

module.exports = {
  connectDB : connectDB, 
  closeDB : closeDB,
} 
