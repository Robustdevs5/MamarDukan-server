const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    review: {type: String, required: true},
    reviewRating: {type: Number, required: true},
 },
 { timestamps: true});

 module.exports = mongoose.model('Review', reviewSchema)