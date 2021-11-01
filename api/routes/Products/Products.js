const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');


const productsControllers = require('../../controllers/Products');



// ******************** All products route Handlers ****************

router.get('/', productsControllers.get_all_products);
// Category query
router.get('/category', productsControllers.get_products_by_category);
// Brand query
router.get('/brand', productsControllers.get_products_by_brands);
// Department query
router.get('/department', productsControllers.get_products_by_department);

router.post('/', productsControllers.add_product);
router.get('/:productId', productsControllers.get_single_products);
router.patch('/:productId', productsControllers.updatedProducts);
router.delete('/:productId', productsControllers.deleted_products);

module.exports = router;
