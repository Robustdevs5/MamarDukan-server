const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {type:String, required: true},
    ShopName: {type:String},
    ShopUrl: {type: String, unique: true},
    PhoneNumber: {type: Number},
    role: {type: String, default: "user"},
    status: {type: String, default: "pending"}

});

module.exports  = mongoose.model('User', userSchema)