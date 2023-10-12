
const mongoose = require('mongoose');
const dotenv = require('dotenv');
 
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const db = process.env.MONGO_URI;
console.log(db)

// Database connection function
//this should allow everyone access 
const connectDB = async () => {
  try {
    await mongoose.connect(db ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGODB_DB
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Connection failed', err);
    process.exit(1); // Exit the process with an error code
  }
};

const closeDB = async () => {
  await mongoose.connection.close();
  console.log('Closed database connection');
}

module.exports = {
  connectDB : connectDB, 
  closeDB : closeDB,
} 
