const mongoose = require('mongoose');

const anotherUser = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    shopUrl: {type: String},
    shopName: {type: String},
    phoneNumber: {type: String}
}, {timestamps: true}
);

module.exports = mongoose.model("AnotherUser", anotherUser)