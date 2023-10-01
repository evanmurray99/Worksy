
const mongoose = require('mongoose');
const config = require('./keys');
const db = config.mongoURI;



// Database connection function
const connectDB = async (env) => {
   
  try {
    await mongoose.connect(db ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: env = process.env.MONGODB_DB
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Connection failed', err);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
