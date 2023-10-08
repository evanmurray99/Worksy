const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    seller :  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required : true, 
      },
      price: {
        type: Number,
        min: 0, 
        required: true, 
      },
    created : {
        type: Date,
        default: Date.now, 
      },
    updated : {
        type: Date,
        default: Date.now, 
      },
    rating : Number,
    reviews : [reviewSchema],
});

const Service =  mongoose.model('Service', serviceSchema, 'Services');
module.exports = Service;