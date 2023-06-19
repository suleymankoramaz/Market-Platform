const express = require('express');
const subDealersController = require('../controllers/subDealerController');

const router = express.Router();

router.get('/', subDealersController.getAllSubDealers);
router.post('/', subDealersController.addSubDealer);

module.exports = router;