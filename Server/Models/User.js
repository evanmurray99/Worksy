const mongoose = require("mongoose");

const notificationSchema =  new mongoose.Schema({
    index: Number,
    body: String,
    notification_type : { type: String, enum: ['chat', 'order'] },
    status: { type: String, enum: ['read', 'unread'] },
    created: {
      type: Date,
      default: Date.now, 
    },
  });

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  isStudent : {
    type : Boolean, 
    required : true,
  }, 
  notifications: [notificationSchema], 
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chats' }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }], 
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }], 
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }], 
  
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;

