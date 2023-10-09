const mongoose = require('mongoose');

const messageSchema = require('./Message');

const chatSchema = new mongoose.Schema({
  participant_1 :  {
    type: mongoose.Schema.Types.ObjectId, ref: 'Users',
    required : true, 
  },
  participant_2 :  {
    type: mongoose.Schema.Types.ObjectId, ref: 'Users',
    required : true, 
  }, 
  service : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Services',
    required : true, 
  },
  messages: [messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema, 'Chats');

module.exports = Chat;