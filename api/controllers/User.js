const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const User = require('../models/users');
const AnotherUser = require('../models/anotherUser');

//************************* Signup User  ***************************************
exports.signUp_user =  (req, res, next) => {

    User.find({ email: req.body.email}) 
        .exec()
        .then(user => {
            console.log(user);
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "already have an account",
                });
                
            }
            
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    
                    if(err) {
                        return res.status(500).json({
                            error: err,
                            message: "error khelam from bcrypt"
                        });
                    } else {
                        // const ShopUrl = req.body.ShopUrl.split(/\s/).join('');
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            ShopName: req.body.ShopName,
                            ShopUrl: req.body.ShopUrl,
                            role: req.body.role,
                            status: req.body.status,
                            PhoneNumber: req.body.PhoneNumber,
                            password: hash
                        });
                        console.log("user", user)

                        user.save()
                            .then( result => {
                                console.log("user result", result)
                                res.status(201).json({
                                    message: " User Created",
                                    user: {
                                        email: result.email,
                                        name: result.name,
                                        role: result.role,
                                        status: result.status,
                                        vendor: {
                                            ShopName: result.ShopName,
                                            ShopUrl: "https://mamar-dukan.web.app/seller/" + result.ShopUrl,
                                            PhoneNumber: result.PhoneNumber
                                        }
                                    }
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });

                    }
                });
            }
        })
};

//************************* Another signup User  ***************************************
 exports.anotherSignupUser = (req, res , next ) => {
    AnotherUser.find({ email: req.body.email})
        .exec()
        .then( user => {
            console.log('another user', user);
            if (user.length < 1) {
                return res.status(404).json({
                    message: "already account ace bhaisab"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(404).json({
                            error: err,
                            message: "error from hash password"
                        });
                    } else {
                        const allUser = new User({
                            user: req.body
                        });
                        console.log("another input user", user);
                        allUser.save()
                            .then( result => {
                                console.log("another user result", result);
                                res.status(200).json({
                                    message: "another user created",
                                    user: result
                                })
                            })
                            .catch(err => {
                               res.status(404).json({
                                   error: err,
                                   message: "error from another user save"
                               })
                            })
                    }
                })
            }
        })
 }
//************************* Login User  ***************************************

exports.login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed, email not found!"
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: "Auth failed!"
                    });
                }

                if (result) {

                   const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                            process.env.JWT_KEY, 
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        email: user[0].email,
                    });
                }
                res.status(401).json({
                    message: "password don't match!"
                });
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


//************************* Get All ***************************************

exports.all_user = (req, res, next) => {
    User.find()
        .exec()
        .then( result => {
            const allUser = {
                count: result.length,
                user: result.map( doc => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        name: doc.name,
                        role: doc.role,
                        status: doc.status,
                        vendor: {
                            ShopName: doc.ShopName,
                            ShopUrl: "https://mamar-dukan.web.app/seller/" + result.ShopUrl,
                            PhoneNumber: doc.PhoneNumber
                        }
                    };
                })
            };

            console.log('all user', allUser);
            if (result.length >= 0) {
                res.status(201).json({
                    message: "successfully get all user",
                    allUser
                });
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID!'
                });
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



//************************* Get single user  ***************************************

exports.single_user = (req, res, next) => {
    User.findById({ _id: req.params.userId })
        .exec()
        .then( doc => {
            console.log('single user', doc)
            if (doc) {
                res.status(201).json({
                    message: "successfully get all single user",
                    _id: doc._id,
                    email: doc.email,
                    name: doc.name,
                    role: doc.role,
                    status: doc.status,
                    vendor: {
                        ShopName: doc.ShopName,
                        ShopUrl: "https://mamar-dukan.web.app/seller/" + doc.ShopUrl,
                        PhoneNumber: doc.PhoneNumber
                    }
                });
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID!'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: "single user not found"
            });
        });
};



//************************* updated user  ***************************************

exports.updated_user= (req, res, next) => {
    const id = req.params.userId;
    const updatedUser = {};
    for (const user of req.body) {
        updatedUser[yser.propName] = user.value;
    }
    User.updateOne({ _id: id }, {$set: updatedUser})
        .exec()
        .then( result => {
            res.status(201).json({
                message: " successfully get all user",
                user: {
                    email: result.email,
                    name: result.name,
                    password: result.password,
                    vendor: {
                        ShopName: result.ShopName,
                        ShopUrl: "https://mamar-dukan.web.app/seller/" + result.ShopUrl,
                        PhoneNumber: result.PhoneNumber
                    }
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


//************************* User delete  ***************************************

exports.login_user_deleted = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



//************************* Thank you! ***************************************