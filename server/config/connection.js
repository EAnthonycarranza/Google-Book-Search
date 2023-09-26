require('dotenv').config();
const mongoose = require('mongoose');

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose
  .connect(`mongodb+srv://${username}:${password}@cluster0.rqnbw2o.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    // Your code that relies on the MongoDB connection can go here
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Your application code can continue here without waiting for db.once
