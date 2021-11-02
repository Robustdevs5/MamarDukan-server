const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required:true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, default: Date.now},
    img: {type: String, required: true},
});

module.exports = mongoose.model('Blog', blogSchema)
