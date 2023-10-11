const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : True,

    },

    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }], 
    
});

const Category =  mongoose.model('Category', serviceSchema, 'Categories');
module.exports = Category;