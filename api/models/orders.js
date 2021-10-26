const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, default: 10},
    status: {type: String},
    date: {type: Date, default: Date.now}
},
{ timestamps: true});

module.exports = mongoose.model('Order', orderSchema)