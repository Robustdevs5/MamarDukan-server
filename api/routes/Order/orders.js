const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');


const OrderControllers = require('../../controllers/orders');


//****************** All Order Route Handler *******************

router.get('/', OrderControllers.orders_get_all);
router.post('/', OrderControllers.create_Order);
router.get('/:orderId', OrderControllers.get_single_order);
router.patch('/:orderId', OrderControllers.updated_order);
router.delete('/:orderId', OrderControllers.order_delete);


module.exports = router;
