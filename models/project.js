const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },    

}, {timestamps: true});

module.exports = mongoose.model('Projects', Schema);