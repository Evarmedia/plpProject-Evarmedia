require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Import and configure middlewares
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/db'); // Import Sequelize instance

app.use(cors());
app.use(bodyParser.json());

// default route
app.get('/', (req, res) => {
  res.send("Welcome to NGo Management API");
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import and use routes
const userRoutes = require('./routes/authRoutes');
const communityRoutes = require('./routes/communityRoutes');
const donationRoutes = require('./routes/donationRoutes');

app.use('/users', userRoutes);
app.use('/communities', communityRoutes);
app.use('/donations', donationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
