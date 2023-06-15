const express = require('express');
const subDealersController = require('../controllers/subDealersController');

const router = express.Router();

router.get('/', subDealersController.getAllSubDealers);
router.post('/', subDealersController.addSubDealer);

module.exports = router;