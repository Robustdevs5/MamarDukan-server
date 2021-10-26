const mongoose = require('mongoose');
const Product = require('../models/product');
const Review = require('../models/Review');

//************************* Get all products review from database ***************************************
exports.get_All_Review = async (req, res, next) => {
    try {
        Review.find()
            // .select('star user review _id product')
            .populate('product user', 'name price brand color email img')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    review: docs.map(result => {
                        console.log("result",result)
                        return {
                            _id: result.id,
                            star: result.star,
                            review: result.review,
                            date: result.date,
                            user: result.user,
                            product: result.product
                            
                        };
                        
                    })

                };
                
                console.log('review', response);
                if (docs.length >= 0) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'No review found'
                    });
                };
            })
    }
    catch{
        res.status(404).json({
            message: "something wrong"
        });
    }
};

//************************* Create review  ***************************************

exports.create_review = async (req, res, next) => {

    try{
        Product.findById(req.body.productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({
                        message: "Product not fount",
                    });
                }
                const review = new Review({
                   _id: mongoose.Types.ObjectId(),
                   review: req.body.review,
                   star: req.body.star,
                   date: req.body.date,
                   product: req.body.productId,
                   user: req.body.userId,
                })
                return review.save()
            })
            .then(result => {
                
                console.log('result', result)
                res.status(200).json({
                    message: "successfully done a review",
                    review: {
                        _id: result.id,
                        review: result.review,
                        star: result.star,
                        date: result.date,
                        product: result.product,
                        user: result.user

                    }
                })
            })
            
    }
    catch{
        res.status(404).json({
            message: "review not added"
        });
    }
}