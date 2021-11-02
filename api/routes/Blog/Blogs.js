const express = require('express');
const router = express.Router();
const { get_All_blog, get_blog_by_category, create_blog, get_single_blog, updatedBlogs, deleted_blogs } = require('../../controllers/blog');


// ******************** All Blog route Handlers ****************

router.get('/', get_All_blog);
// Category query
router.get('/category', get_blog_by_category);
// Single Blog Query
router.get('/:blogId', get_single_blog);
router.post('/', create_blog);
router.patch('/:blogId', updatedBlogs);
router.delete('/:blogId', deleted_blogs);

module.exports = router;
