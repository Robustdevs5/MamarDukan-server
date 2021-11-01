const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/orders');





//************************* Get all products from database ***************************************

exports.get_all_products = async (req, res, next) => {

    try{

        Product.find()
            // .select("name price _id color description category brand img discount review")
            .populate("order")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    products: docs.map(result => {
                        console.log('pd result',result.order)
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
                                order: result.order,
                                // quantity: result.quantity,
                                // review: result.review
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
            
        }   catch {
                res.status(404).json({
                    message: "Products not added"
                });
            };
 };

//*********************** category query ******************************* */  


exports.get_products_by_category = async (req, res, next) => {
    try {
        Product.find({ category: req.query.category })
        // .limit(2)
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
            } else {
            res.status(200).json({
                result: data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "Products not found"
        });
    }
}


//*********************** Brand query ******************************* */  
exports.get_products_by_brands = async (req, res, next) => {
    try {
        Product.find({ brand: req.query.brand })
        // .limit(2)
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
            } else {
            res.status(200).json({
                result: data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "Products not found"
        });
    }
}


//*********************** department query ******************************* */
exports.get_products_by_department = async (req, res, next) => {
    try {
        Product.find({ department: req.query.department })
        // .limit(2)
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
            } else {
            res.status(200).json({
                result: data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "Products not found"
        });
    }
}


//************************* Add product on database  ***************************************

exports.add_product = async (req, res, next) => {
    try {
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
                            order: result.order,
                            // quantity: result.quantity,
                            // review: result.review
                        }
                    }
                });
            })

        } catch {
                res.status(404).json({
                    message: "Products not added"
                });
            };
    
};


//*************************  Get single products from database ***************************************

exports.get_single_products =  async (req, res, next) => {
    try {
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

        } catch {
                res.status(404).json({
                    message: "Products not found"
                });
            };
};




//************************* Updated the products from database ***************************************

// exports.updated_products = async (req, res, next) => {
//     try {
//         const id = req.params.productId;
//         const updatedOps = {};
//         for (const ops of req.body) {
//             updatedOps[ops.propName] = ops.value;
//         }
//         Product.updateMany({_id: id}, {$set: updatedOps})
//             .exec()
//             .then(result => {
//                 res.status(200).json({
//                     message: 'successfully a product updated',
//                     multiVendorSeller: {
//                         type: "GET",
//                         url: "https://mamar-dukan.web.app/seller/" + id
//                     }
//                 });
//             })
//         }
//         catch{
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         }
// };


// ***************************** product updated ************************

exports.updatedProducts = async (req, res, next) => {
    try {
        const products = await Product.findById(req.params.productId);
        
        Object.assign(products, req.body);
        products.save();

        res.status(200).json({
            message: 'successfully a product updated',
            multiVendorSeller: {
                type: "GET",
                url: "https://mamar-dukan.web.app/seller/" + id
            }
        });

    } catch {
        res.status(404).json({
            message: "Products not updated"
        });
    }
}

//*************************  Delete the products from database ***************************************

exports.deleted_products =  async (req, res, next) => {
   
    try {
        const id = req.params.productId;
        // const name = req.params.productId;
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
        } catch {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            };
};


//*************************  Thank you! ***************************************