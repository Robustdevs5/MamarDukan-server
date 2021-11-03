const express = require('express');
const router = express.Router();
const { get_All_Message, create_Message, deleted_Message, get_single_Message } = require('../../controllers/message');


// ******************** All Message route Handlers ****************

router.get('/', get_All_Message);
router.get('/:messageId', get_single_Message);
router.post('/', create_Message);
router.delete('/:messageId', deleted_Message);

module.exports = router;
