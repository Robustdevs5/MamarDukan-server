const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../../models/product');


// Get all products from database
router.get('/', (req, res, next) => {
   Product.find()
        .select("name price _id")
        .exec()
        .then(docs => {
            
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        multiVentorSellar: {
                            type: 'GET',
                            url: 'http://localhost:5000/products/' + doc._id
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
        price:req.body.price
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "handling post request frm /products routs",
                createdProduct: result
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
        .exec()
        .then(doc => {
            console.log('doc console', doc);
            if (doc) {
                res.status(200).json(doc);
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
            console.log(result);
            res.status(200).json(result);
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
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
