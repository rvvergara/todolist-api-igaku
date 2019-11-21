const User = require('../models/user');

exports.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ error: 'Cannot find user' });
    }
    res.send(user);
  } catch (e) {
    res.status(500);
  }
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return user ? res.status(202).send(user) : res.status(404).send({ error: 'Cannot find user' });
  } catch (e) {
    return res.status(422).send(e.errors);
  }
};

exports.destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return user ? res.status(202).send({ success: 'User deleted' }) : res.status(404).send({ error: 'Cannot find user' });
  } catch (e) {
    return res.status(500);
  }
};
