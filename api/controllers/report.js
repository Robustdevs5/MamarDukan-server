const mongoose = require('mongoose');
const Report = require('../models/report')

//************************* Get all Report from database ***************************************
exports.get_All_Report = async (req, res, next) => {
    try {
        Report.find()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    Report: docs,
                };
                
                console.log('Report', response.length);
                if (docs.length >= 0) {
                    res.status(200).json({
                        Report: "successfully found Report",
                        result: response,
                    });
                } else {
                    res.status(404).json({
                        Report: 'No Report found'
                    });
                };
            })
    }
    catch{
        res.status(404).json({
            Report: "something wrong"
        });
    }
};

//******************* Create Report *************************

exports.create_Report = async (req, res, next) => {

    try{
        const report = new Report({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            phone: req.body.phone,
            subject: req.body.subject,
            status: req.body.status,
            email: req.body.email,
            date: req.body.date,
            message: req.body.message,
            department: req.body.department,
            updatedDate: req.body.updatedDate,
         })
         return report.save()       
       
        .then(result => {                       
            console.log('result', result)
            res.status(200).json({
                message: "successfully done a Report",
                result: result
            })
        })   
            
    }
    catch(err){
        res.status(404).json({
            message: "Report not added",
            error: err
        });
    }
}


//*****************  Get single Report from database ********************

exports.get_single_Report =  async (req, res, next) => {
    try {
        const id = req.params.reportId;
        Report.findById(id)
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
                    message: "Report not found"
                });
            };
};




//*********************  Delete the Report from database ************************

exports.deleted_Report =  async (req, res, next) => {
   
    try {
        const id = req.params.reportId;
        Report.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'successfully deleted a Report',
                });
            })
        } catch {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            };
};

// ************************* report updated ************************

exports.updatedReport = async (req, res, next) => {
    try {
        const report = await Report.findById(req.params.reportId);
        
        Object.assign(report, req.body);
        report.save();

        res.status(200).json({
            message: 'successfully a report updated',
        });

    } catch {
        res.status(404).json({
            message: "report not updated"
        });
    }
}