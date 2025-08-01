const mongoose = require('mongoose');

const Schema = mongoose.Schema //schema bhaneko sheet of docu
const userSchema = new Schema({ 
    
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
        }
    }, {timestamps: true});

    module.exports = mongoose.model('User', userSchema);