const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const mpesaRoutes = require('./routes/mpesa.routes');
const db = require('./models'); // Sequelize DB setup

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins, or replace '*' with specific origin(s) like 'http://localhost:3001'
  methods: 'GET,POST,PUT,DELETE', // Allow specific methods
}));

// Routes
app.use('/mpesa', mpesaRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  console.log('Database connected successfully.');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});