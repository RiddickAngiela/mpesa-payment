const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesa.controller');

// Route for initiating STK Push
router.post('/stkpush', mpesaController.initiateStkPush);

// Route for handling M-PESA callback
router.post('/callback', mpesaController.handleMpesaCallback);

module.exports = router;
