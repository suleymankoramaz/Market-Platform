const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/', salesController.recordSale);

module.exports = router;