const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please put a valid email');
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
