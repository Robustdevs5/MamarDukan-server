const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    user:{type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    star:{type: Number},
    review:{type: String, required: true},
    date: {type: Date, default: Date.now}
 },
 { timestamps: true});

 module.exports = mongoose.model('Review', reviewSchema)