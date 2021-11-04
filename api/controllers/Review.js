const mongoose = require('mongoose');
const Product = require('../models/product');
const Review = require('../models/Review');

//************************* Get all products review from database ***************************************
exports.get_All_Review = async (req, res, next) => {
    try {
        Review.find()
            // .select('star user review _id product')
            .populate('product', 'name price brand color email img')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    review: docs.map(result => {
                        console.log("result",result)
                        return { result};
                        
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
                   product: req.body.productId,
                   name: req.body.name,
                   reviewRating: req.body.reviewRating,

                })
                return review.save()
            })
            .then(result => {
                
                console.log('result', result)
                res.status(200).json({
                    message: "successfully done a review",
                    review: result
                })
            })
            
    }
    catch{
        res.status(404).json({
            message: "review not added"
        });
    }
}

//*****************  Get single review from database ********************

exports.get_single_review =  async (req, res, next) => {
    try {
        const id = req.params.reviewId;
        Review.findById(id)
            .exec()
            .then(doc => {
                console.log('doc console', doc);
                if (doc) {
                    res.status(200).json({
                        count: doc.length,
                        result: doc,
                        message: "Success",
                    });
                } else {
                    res.status(400).json({
                        message: 'No valid entry found for provided ID!'
                    });
                };
                
            })

        } catch {
                res.status(404).json({
                    message: "Review not found"
                });
            };
};
