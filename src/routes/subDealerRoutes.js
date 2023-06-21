const express = require('express');
const subDealersController = require('../controllers/subDealerController');

const router = express.Router();

router.get('/', subDealersController.getAllSubDealers);

module.exports = router;