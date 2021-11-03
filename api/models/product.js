const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required:true},
    price: {type: Number, required: true},
    discountPrice: {type: Number, default:0},
    couponPrice: {type: Number, default:0},
    couponCode: {type: String, default:'Not available'},
    description: {type: String, required: true},
    category: {type: String, required: true},
    color: {type: String, required: true},
    brand: {type: String, required: true},
    date: {type: Date, default: Date.now},
    department: {type: String, require: true},
    img: {type: String, required: true},
    size: {type: String, required: true},
    order: {type: mongoose.Schema.Types.ObjectId, ref: "Order"},
});

module.exports = mongoose.model('Product', productSchema)
