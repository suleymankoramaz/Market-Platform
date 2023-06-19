const express = require('express');
const salesController = require('../controllers/saleController');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/', salesController.recordSale);

module.exports = router;