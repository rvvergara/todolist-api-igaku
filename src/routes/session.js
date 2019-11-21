const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/v1/sessions', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});

module.exports = router;
