const mongoose = require('mongoose');

const anotherUser = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true}
);

module.exports = mongoose.model("AnotherUser", anotherUser)

// const userSchema = mongoose.Schema({
//     // _id: mongoose.Schema.Types.ObjectId,
//     name: {type: String, require: true},
//     email: {
//         type: String, 
//         required: true, 
//         unique: true,
//         match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     },
//     password: {type:String},
//     ShopName: {type:String},
//     ShopUrl: {type: String},
//     PhoneNumber: {type: Number},
//     role: {type: String, required: true, default: "user"},
//     status: {type: String, required: true, default: "pending"}

// },
// { timestamps: true }
// );

// module.exports  = mongoose.model('User', userSchema)