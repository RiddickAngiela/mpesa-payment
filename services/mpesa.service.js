const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

// Get M-PESA access token
exports.getMpesaAccessToken = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY || "bCK1lGEN0xccZ50GG1mBCIg1qzx0LOAMIuAudsTzFxIGCLzs"; 
  // console.log(consumerKey);
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET || "fy3iD8SFGyYKigSU7txhh1i0C8fpPHmCGmZeEpZOykxCWlgio8CC281SNnKkcRd1";
  // console.log(consumerSecret);
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  // console.log(auth)

  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get M-PESA access token', error);
    throw error;
  }
};

// Initiate M-PESA STK Push
exports.initiateStkPush = async (token, { phoneNumber, amount, accountReference }) => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64');

  const stkPushData = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: 'Payment',
  };

  // console.log(stkPushData)

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to initiate STK Push', error);
    throw error;
  }
};


