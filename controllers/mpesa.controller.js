const mpesaService = require('../services/mpesa.service');

// Initiate M-PESA STK Push
exports.initiateStkPush = async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference } = req.body;

    // Get access token and initiate STK push
    const accessToken = await mpesaService.getMpesaAccessToken();
    console.log(accessToken);
    const stkResponse = await mpesaService.initiateStkPush(accessToken, {
      phoneNumber,
      amount,
      accountReference
    });

    // Respond with STK Push details
    res.status(200).json({ message: 'STK Push initiated', data: stkResponse });
  } catch (error) {
    console.error('STK Push error:', error);
    res.status(500).json({ message: 'Failed to initiate STK Push', error: error.message });
  }
};

// Handle M-PESA callback
exports.handleMpesaCallback = (req, res) => {
  const mpesaResponse = req.body;

  // Process the callback data (e.g., update payment status, log response, etc.)
  console.log('M-PESA Callback Response:', mpesaResponse);

  // Send success response back to Safaricom
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: 'Accepted'
  });
};