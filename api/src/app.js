require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const { sequelize } = require('../models');

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const routes = require('./routes');
app.use('/api', routes);

// Sync database
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
