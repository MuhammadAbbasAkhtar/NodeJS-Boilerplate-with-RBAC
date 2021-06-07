const mongoose = require('mongoose');
const config = require('../config/keys')
// only used for registration
const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: config.EMAIL_TOKEN_EXPIRY
    }

});
tokenSchema.index({createdAt: 1},{expireAfterSeconds: config.EMAIL_TOKEN_EXPIRY});
module.exports = mongoose.model('Tokens', tokenSchema);