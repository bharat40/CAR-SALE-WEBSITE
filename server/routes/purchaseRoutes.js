const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/purchaseController');



router.post('/send-purchase-email', makePayment);

module.exports = router;