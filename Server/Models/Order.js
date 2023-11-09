const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    seller :  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required : true, 
      },
    buyer : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required : true, 
      },
    service : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Services',
        required : true, 
      },
    status: { type: String, enum: ['created', 'accepted', 'rejected','complete'] },
    created : {
        type: Date,
        default: Date.now, 
      },
    updated : {
        type: Date,
        default: Date.now, 
      },
    rating : Number,
    reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
});


const Order =  mongoose.model('Order', orderSchema, 'Orders');
module.exports = Order