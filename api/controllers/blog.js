const mongoose = require('mongoose');
const Blog = require('../models/blog')

//************************* Get all blog from database ***************************************
exports.get_All_blog = async (req, res, next) => {
    try {
        Blog.find()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    blog: docs,
                };
                
                console.log('blog', response);
                if (docs.length >= 0) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'No blog found'
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

//******************* Create Blog post  *************************

exports.create_blog = async (req, res, next) => {

    try{
        const blog = new Blog({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            category: req.body.category,
            img: req.body.img,
         })
         return blog.save()       
       
        .then(result => {                       
            console.log('result', result)
            res.status(200).json({
                message: "successfully done a Blog",
                blog: {
                    _id: result.id,
                    name: result.name,
                    description: result.description,
                    date: result.date,
                    category: result.category,
                    img: result.img       
                }
            })
        })   
            
    }
    catch{
        res.status(404).json({
            message: "Blog not added"
        });
    }
}


//******************* category query ************************* */  


exports.get_blog_by_category = async (req, res, next) => {
    try {
        Blog.find({ category: req.query.category })
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
            message: "Blog not found"
        });
    }
}

//*****************  Get single blog from database ********************

exports.get_single_blog =  async (req, res, next) => {
    try {
        const id = req.params.blogId;
        Blog.findById(id)
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
                    message: "Blog not found"
                });
            };
};


// ************************* Blog updated ************************

exports.updatedBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.findById(req.params.blogId);
        
        Object.assign(blogs, req.body);
        blogs.save();

        res.status(200).json({
            message: 'successfully a Blog updated',
        });

    } catch {
        res.status(404).json({
            message: "Blog not updated"
        });
    }
}

//*********************  Delete the Blog from database ************************

exports.deleted_blogs =  async (req, res, next) => {
   
    try {
        const id = req.params.blogId;
        // const name = req.params.blogId;
        Blog.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'successfully deleted a Blog',
                });
            })
        } catch {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            };
};