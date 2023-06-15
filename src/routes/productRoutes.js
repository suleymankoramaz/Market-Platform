const express = require('express');
const productsController = require('../controllers/productController');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;