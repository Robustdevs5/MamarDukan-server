const mongoose = require('mongoose');
const Message = require('../models/message')

//************************* Get all Message from database ***************************************
exports.get_All_Message = async (req, res, next) => {
    try {
        Message.find()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    message: docs,
                };
                
                console.log('message', response.length);
                if (docs.length >= 0) {
                    res.status(200).json({
                        message: "successfully found Message",
                        result: response,
                    });
                } else {
                    res.status(404).json({
                        message: 'No Message found'
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

//******************* Create Message *************************

exports.create_Message = async (req, res, next) => {

    try{
        const message = new Message({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            date: req.body.date,
            message: req.body.message,
         })
         return message.save()       
       
        .then(result => {                       
            console.log('result', result)
            res.status(200).json({
                message: "we received your Message",
                count: result.length,
                result: {
                    _id: result.id,
                    name: result.name,
                    phone: result.phone,
                    date: result.date,
                    email: result.email,
                    message: result.message       
                }
            })
        })   
            
    }
    catch(err){
        res.status(404).json({
            message: "Message not added",
            error: err
        });
    }
}


//*****************  Get single Message from database ********************

exports.get_single_Message =  async (req, res, next) => {
    try {
        const id = req.params.messageId;
        Message.findById(id)
            .exec()
            .then(doc => {
                console.log('doc console', doc);
                if (doc) {
                    res.status(200).json({
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
                    message: "Message not found"
                });
            };
};




//*********************  Delete the Message from database ************************

exports.deleted_Message =  async (req, res, next) => {
   
    try {
        const id = req.params.messageId;
        Message.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'successfully deleted a Message',
                });
            })
        } catch {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            };
};