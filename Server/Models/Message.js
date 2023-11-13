const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  sender : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Users',
    required : true, 
  },
  body: {
    type : String,
    required : true, 
    match : '^.+$',
  },
  created: {
    type: Date,
    default: Date.now, 
  },

  read : {
    type : Boolean,
    default : false,
  }

});

const Message = mongoose.model('Message', messageSchema, 'Messages');

module.exports = Message;