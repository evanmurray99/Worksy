const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    seller :  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required : true, 
      },
      description : {
        type : String,
        required : true
      },
      title : {
        type : String,
        required : true
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
    categories : [{ type: String }], 
    rating : Number,
    reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }]
});

const Service =  mongoose.model('Service', serviceSchema, 'Services');
module.exports = Service;