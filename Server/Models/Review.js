const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer :  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required : true, 
    },
    rating : {
        type: Number,
        min: 0, 
        max: 5, 
        required: true, 
    },
    text : {
        type : String,
        required : true
    },
    updated : {
        type : Date,
        default : Date.now
    }
});

const Review =  mongoose.model('Review', reviewSchema, 'Reviews');
module.exports = Review;