// config.js
require('dotenv').config();

module.exports = {
  mpesa: {
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    shortcode: process.env.MPESA_SHORTCODE,
    lipaNaMpesaOnlineShortcode: process.env.MPESA_LIPA_NA_MPESA_ONLINE_SHORTCODE,
    lipaNaMpesaOnlineShortpin: process.env.MPESA_LIPA_NA_MPESA_ONLINE_SHORTPIN,
    passkey: process.env.MPESA_PASSKEY,
    environment: process.env.MPESA_ENVIRONMENT // 'sandbox' or 'production'
  }
};
