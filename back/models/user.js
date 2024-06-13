const mongoose = require('mongoose');

// Define the schema for your data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
     type: Date,
     default: Date.now 
    }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
