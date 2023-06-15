const express = require('express');
const uniqueCodesController = require('../controllers/uniqueCodeController');

const router = express.Router();

router.get('/', uniqueCodesController.getAllUniqueCodes);
router.post('/', uniqueCodesController.addUniqueCode);

module.exports = router;