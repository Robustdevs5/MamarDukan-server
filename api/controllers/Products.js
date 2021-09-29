const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/orders');





//************************* Get all products from database ***************************************

exports.get_all_products = (req, res, next) => {
    Product.find()
         // .select("name price _id color description category brand img discount review")
         .populate("order")
         .exec()
         .then(docs => {
             const response = {
                 count: docs.length,
                 products: docs.map(result => {
                     return {
                        name: result.name,
                        price: result.price,
                        description: result.description,
                        category: result.category,
                        color: result.color,
                        brand: result.brand,
                        _id: result.id,
                        img: result.img,
                        date: result.date,
                        department: result.department,
                        size: result.size,
                        multiVendorSeller: {
                            sellerName: 'Mamar Dukan',
                            url: 'https://mamar-dukan.web.app/seller/' + result._id
                        },
                        discount: {
                            discountPrice: result.price * 10
                        },
                        order: {
                            orderId: result._id,
                            quantity: result.quantity,
                            review: result.review
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
 };

 
//************************* Add product on database  ***************************************

exports.add_product =  (req, res, next) => {
    Order.findById(req.body.orderId)
        .then(order => {
            // if (!order) {
            //     res.status(404).json({
            //         message: "order not found"
            //     })
            // }
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                price:req.body.price,
                description:req.body.description,
                category:req.body.category,
                color:req.body.color,
                brand:req.body.brand,
                img:req.body.img,
                date: req.body.date,
                department: req.body.department,
                size: req.body.size,
                order: req.body.orderId
            })
            return product.save()
        })
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
                    date: result.date,
                    department: result.department,
                    size: result.size,
                    multiVendorSeller: {
                        sellerName: 'Mamar Dukan',
                        url: 'https://mamar-dukan.web.app/seller/' + result._id
                    },
                    discount: {
                        discountPrice: result.price * 10
                    },
                    order: {
                        orderId: result._id,
                        quantity: result.quantity,
                        review: result.review
                    }
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
    
};


//*************************  Get single products from database ***************************************

exports.get_single_products =  (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        // .select('name price _id color description category brand img review')
        .populate("order")
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
};

//************************* Updated the products from database ***************************************

exports.updated_products = (req, res, next) => {
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
                    url: "https://mamar-dukan.web.app/seller/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

//*************************  Delete the products from database ***************************************

exports.deleted_products =  (req, res, next) => {
    const id = req.params.productId;
    const name = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'successfully deleted a product',
                multiVendorSeller: {
                    type: "POST",
                    url: '"https://mamar-dukan.web.app/seller/',
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
};


//*************************  Thank you! ***************************************