const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating : Number, 
     body: {
        type : String,
       
      },
});
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
    reviews : [reviewSchema],


});

const Service =  mongoose.model('Service', serviceSchema, 'Services');
module.exports = Service;