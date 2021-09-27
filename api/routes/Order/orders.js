const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../../../models/orders');
const Product = require('../../../models/product');

// Get all order from database
router.get('/', (req, res, next) => {
    Order.find()
        .select('product quantity _id status')
        .populate('product', 'name price brand color')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    console.log("docs",doc)
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        multiVendorSeller: {
                            type: "GET",
                            url: "http://localhost:3000/" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// Post an order on database
router.post('/',(req, res, next) => {
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
                status: "PENDING"
            })
            return order.save()     
        })
        .then(result => {
            res.status(201).json({
                message: 'successfully added your order',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    status: "PENDING"
                },
                multiVendorSeller: {
                    type: "GET",
                    url: "http://localhost:3000/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});


// Get single order from database
router.get('/:orderId', (req,res,next) => {

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
});


// updated order from database
router.patch('/:orderId',(req, res, next) =>{
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
});




// delete order from database
router.delete('/:orderId', (req, res, next) => {
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
});


module.exports = router;
