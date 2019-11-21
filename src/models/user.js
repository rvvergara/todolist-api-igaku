const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Todo = require('./todo');

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
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Virtual attributes
UserSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'owner',
});

// Middlewares
// 1. Hash new password (during user create and updating of password)
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  return next();
});

// 2. Delete all user's Todos prior to user getting deleted
UserSchema.pre('remove', async function (next) {
  const user = this;
  await Todo.deleteMany({
    owner: user._id,
  });
  next();
});

// Static methods
// 1. Helper method for logging in a user using email and password
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email error');
  }
  const isAuthenticated = await bcrypt.compare(password, user.password);
  if (!isAuthenticated) {
    throw new Error('Password error');
  }
  return user;
};

// Instance methods

// 1. Generating a user token based on user._id -> concatenate to user's tokens collection
// - this is in order to log out a user properly per device
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    'mysecretkey',
    {
      expiresIn: '1 day',
    },
  );
  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

// 2. Method to choose which fields to send back as response
UserSchema.methods.toJSON = function () {
  const user = this;
  const obj = user.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
