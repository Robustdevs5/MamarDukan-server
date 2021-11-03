const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    email: {type: String, required: true},
    department: {type: String, required: true},
    status: {type: String, required: true, default:"PENDING"},
    date: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Report', reportSchema)
