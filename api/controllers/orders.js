const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/product');



//************************* Get All Order ***************************************

exports.orders_get_all =  (req, res, next) => {
    Order.find()
        // .select('product quantity _id status')
        .populate('product', 'name price brand color')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(result => {
                    console.log("docs",result)
                    return {
                        _id: result._id,
                        notes: result.notes,
                        product:{ 
                            product: result.product,
                            review: result.review,
                            reviewRating: result.reviewRating,
                        },
                        user:{ 
                            name: result.name,
                            email: result.email,
                            phone: result.phone,
                            address: result.address,
                            city: result.city,
                            postcode: result.postcode,
                        },
                        payment:{
                            cardnumber: result.cardnumber,
                            bankDrap: result.bankDrap,
                            paymentMethod: result.paymentMethod,
                        },
                        order:{
                            status: result.status,
                            orderId: result.orderId,
                            orderDate: result.orderDate,
                            deliveryDate: result.deliveryDate,
                            approveDate: result.approveDate,
                            deliveryMethod: result.deliveryMethod,
                            quantity: result.quantity,
                            price: result.price,
                        },
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};



//************************* Create Order ***************************************
var orderId = Math.floor(Math.random()*1000000000);
exports.create_Order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not fount",
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
                status: "PENDING",
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                bankDrap: req.body.bankDrap,
                address: req.body.address,
                city: req.body.city,
                postcode: req.body.postcode,
                notes: req.body.notes,
                deliveryMethod: req.body.deliveryMethod,
                price: req.body.price,
                paymentMethod: req.body.paymentMethod,
                cardnumber: req.body.cardnumber,
                orderId: "#md-"+orderId,
                deliveryDate: req.body.deliveryDate,
                approveDate: req.body.approveDate,
                review: req.body.review,
                reviewRating: req.body.reviewRating,
                // date: req.body.date,
            })
            return order.save()     
        })
        .then(result => {
            res.status(201).json({
                message: 'Your Order Placed successfully',
                createdOrder: {
                    _id: result._id,
                    notes: result.notes,
                    user:{ 
                        name: result.name,
                        email: result.email,
                        phone: result.phone,
                        address: result.address,
                        city: result.city,
                        postcode: result.postcode,
                        paymentMethod: result.paymentMethod,
                    },
                    payment:{
                        cardnumber: result.cardnumber,
                        bankDrap: result.bankDrap,
                        paymentMethod: result.paymentMethod,
                    },
                    product:{
                        quantity: result.quantity,
                        price: result.price,
                        product: result.productId,
                        review: result.review,
                        rereviewRatingview: result.reviewRating,
                    },
                    order:{
                        status: result.status,
                        orderId: result.orderId,
                        orderDate: result.orderDate,
                        deliveryDate: result.deliveryDate,
                        approveDate: result.approveDate,
                        deliveryMethod: result.deliveryMethod,
                    },
                    
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
};


//************************* Get single order from database ***************************************

exports.get_single_order = (req,res,next) => {

    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if(!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            };
            res.status(200).json({
                message : 'successfully find out a single order',
                order: order,
                multiVendorSeller: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


//************************* updated order from database ***************************************

exports.updated_order = (req, res, next) =>{
    const id = req.params.orderId;
    const updatedOrderStatus = {};
    for (const status of req.body) {
        updatedOrderStatus[status.propName] = status.value;
    }
    Order.updateOne({_id: id}, {$set: updatedOrderStatus})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Updated your order status successfully",
                multiVendorSeller: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + id
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
};



//************************* delete order from database ***************************************

exports.order_delete = (req, res, next) => {
    Order.remove({_id: req.params.orderId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "delete order",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders",
                    body: {productId: "ID", quantity:"Number"}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};



//************************* Thank You! ***************************************