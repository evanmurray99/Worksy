
const mongoose = require('mongoose');
const config = require('./keys');
const db = config.mongoURI;



// Database connection function
const connectDB = async (env) => {
    const db_map = {
        'test': 'worksy_test',
        'dev': 'worksy_dev',
        'prod': 'worksy'
    }
  try {
    await mongoose.connect(db ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: env = db_map[env]
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Connection failed', err);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
