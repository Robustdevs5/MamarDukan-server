const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../../../models/product');


// Get all products from database
router.get('/', (req, res, next) => {
   Product.find()
        // .select("name price _id color description category brand img discount review")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        description: doc.description,
                        category: doc.category,
                        color: doc.color,
                        brand: doc.brand,
                        img: doc.img,
                        multiVendorSeller: {
                            sellerName: "Mamar dukan",
                            url: 'https://mamar-dukan.web.app/seller/' + doc._id
                        },
                        discount: {
                            discountPrice: doc.price - .10
                        }
                    };
                })
            };

            console.log(response);
            if (docs.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});




// Add product on database 
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        color:req.body.color,
        brand:req.body.brand,
        review:'No review',
        img:req.body.img,
        date: req.body.date,
        department: req.body.department
    })
    product.save()
        .then(result => {
            console.log('result', result)
            res.status(200).json({
                message: "successfully added a product",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    category: result.category,
                    color: result.color,
                    brand: result.brand,
                    _id: result.id,
                    img: result.img,
                    review: 'No review',
                    date: result.date,
                    department: result.department,
                    multiVendorSeller: {
                        sellerName: 'Mamar Dukan',
                        url: 'https://mamar-dukan.web.app/seller/' + result._id
                    },
                    discount: {
                        discountPrice: result.price * 10
                    },
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
    
});





// Get single products from database
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id color description category brand img review')
        .exec()
        .then(doc => {
            console.log('doc console', doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    multiVendorSeller:{
                        type: "GET",
                        url: "https://mamar-dukan.web.app/seller/"
                    }
                });
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID!'
                });
            };
            
        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({error: err});
        });
});





// Updated the products from database
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updatedOps = {};
    for (const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {$set: updatedOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'successfully a product updated',
                multiVendorSeller: {
                    type: "GET",
                    url: "https://mamar-dukan.web.app/seller//" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});




// Delete the products from database
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const name = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'successfully deleted a product',
                multiVendorSeller: {
                    type: "POST",
                    url: '"https://mamar-dukan.web.app/seller//',
                    body:{ name: 'String', price: 'Number'},
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
