const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../../models/orders');


// Get all order from database
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get all order'
    });
});


// Post an order on database
router.post('/',(req,res,next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
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
