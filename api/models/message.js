const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: Number,
    email: {type: String, required: true},
    date: {type: Date, default: Date.now},
    message: String,
});

module.exports = mongoose.model('Message', messageSchema)
