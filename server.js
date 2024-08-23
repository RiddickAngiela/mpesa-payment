const express = require('express');
const db = require('./models');

const app = express();
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Mpesa Payment System');
});

// Create a new Mpesa Payment
app.post('/payments', async (req, res) => {
  const { phoneNumber, amount, transactionId } = req.body;

  try {
    console.log(`Processing payment for transaction ID: ${transactionId}`);

    const newPayment = await db.MpesaPayment.create({
      phoneNumber,
      amount,
      transactionId,
      status: 'pending'
    });

    console.log(`Payment created: ${newPayment.id}`);
    res.status(201).json(newPayment);

  } catch (error) {
    console.error('Error processing payment:', error.message);
    res.status(500).json({ error: 'Error processing payment', details: error.message });
  }
});

// Authenticate and sync models, then start the server
db.sequelize.authenticate().then(() => {
  console.log('Database connection established.');

  return db.sequelize.sync();
}).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
