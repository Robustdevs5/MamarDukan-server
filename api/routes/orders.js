const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../../models/orders');
const Product = require('../../models/product');

// Get all order from database
router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
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
    // res.status(200).json({
    //     message: 'Get all order'
    // });
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
                product: req.body.productId
            })
            return order.save()     
        })
        .then(result => {
            res.status(201).json({
                message: 'successfully added your order',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
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
    
    // res.status(201).json({
    //     message: 'successfully added your order',
    //     order: order
    // });
});


// Get single order from database
router.get('/:orderId', (req,res,next) => {
    res.status(200).json({
        message : 'get single order',
        orderId: req.params.orderId
    });
});


// updated order from database
router.patch('/:orderId',(req, res, next) =>{
    res.status(200).json({
        message: 'updated order'
    });
});

// delete order from database
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "delete order",
        orderId: req.params.orderId
    });
});


module.exports = router;
