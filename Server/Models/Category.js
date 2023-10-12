const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,

    },

    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }], 
    
});

const Category =  mongoose.model('Category', categorySchema, 'Categories');
module.exports = Category;