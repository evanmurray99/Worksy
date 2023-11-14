const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  seller :  {
    type: mongoose.Schema.Types.ObjectId, ref: 'Users',
    required : true, 
  },
  buyer :  {
    type: mongoose.Schema.Types.ObjectId, ref: 'Users',
    required : true, 
  }, 
  service : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Services',
    required : true, 
  },
  messages: [{type : mongoose.Schema.Types.ObjectId, ref: 'Messages'}],
});

const Chat = mongoose.model('Chat', chatSchema, 'Chats');

module.exports = Chat;