const express = require('express');
const router = express.Router();

// Get all products from database
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling product GET Request to /product routes '
    });
});


// Add product on database 
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: "handling post request frm /products routs",
        createdProduct: product
    });
});


// Get single products from database
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: "You discovered the special product",
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You cant deserve it'
        });
    }
});

// Updated the products from database
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated Product!'
    });
});

// Delete the products from database
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'delete the products!'
    });
});

module.exports = router;
