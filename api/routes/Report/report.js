const express = require('express');
const router = express.Router();
const { get_All_Report, create_Report, deleted_Report, get_single_Report } = require('../../controllers/report');


// ******************** All report route Handlers ****************

router.get('/', get_All_Report);
router.get('/:reportId', get_single_Report);
router.post('/', create_Report);
router.delete('/:reportId', deleted_Report);

module.exports = router;
 