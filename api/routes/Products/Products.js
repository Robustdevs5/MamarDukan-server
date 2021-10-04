const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');


const productsControllers = require('../../controllers/Products');



// ******************** All products route Handlers ****************

router.get('/', productsControllers.get_all_products);
router.get('/category', productsControllers.get_products_by_category); // Category query
router.get('/brand', productsControllers.get_products_by_brands);  // Brand query
router.post('/', productsControllers.add_product);
router.get('/:productId', productsControllers.get_single_products);
router.patch('/:productId', productsControllers.updatedProducts);
router.delete('/:productId', productsControllers.deleted_products);

module.exports = router;
