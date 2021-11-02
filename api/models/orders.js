const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, default: 10},
    status: {type: String},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    bankDrap: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    postcode: {type: Number, required: true},
    notes: {type: String, },
    deliveryMethod: {type: String, required: true},
    price: {type: String, required: true},
    paymentMethod: {type: String, required: true},
    cardnumber: {type: Number, required: true},
    orderId: {type: String,  required: true},
    orderDate: {type: Date, default: Date.now},
    deliveryDate: {type: Date, default: null},
    approveDate: {type: Date, default: null},
    review: {type: String, default: null},
    reviewRating: {type: Number, default: null},
},
{ timestamps: true});

module.exports = mongoose.model('Order', orderSchema)