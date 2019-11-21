const User = require('../models/user');

exports.show = async (req, res) => {
  res.send(req.user);
};

exports.create = async (req, res) => {
  const user = await new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(422).send(e);
  }
};

exports.update = async (req, res) => {
  const allowedFields = ['username', 'email', 'password'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((field) => allowedFields.includes(field));

  if (!isValid) {
    return res.status(422).send({ error: 'Disallowed field/s' });
  }
  try {
    const user = await req.user;
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    return res.status(202).json(user);
  } catch (e) {
    return res.status(422).send(e.errors);
  }
};

exports.destroy = async (req, res) => {
  try {
    await req.user.remove();
    res.status(202).send({ success: 'User deleted' });
  } catch (e) {
    res.status(500);
  }
};
