const express = require('express');
const router = express.Router();


const reviewControllers = require('../../controllers/Review')
router.get('/', reviewControllers.get_All_Review);
router.post('/', reviewControllers.create_review )

module.exports = router;