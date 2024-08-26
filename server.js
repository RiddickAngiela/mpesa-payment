const express = require('express');
const db = require('./models'); // Make sure this path is correct
const app = express();
app.use(express.json());



// Sync models and start server
db.sequelize.sync().then(() => {
  console.log('Database connection established.');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
