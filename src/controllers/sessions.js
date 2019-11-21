const User = require('../models/user');

exports.create = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
};

exports.destroy = async (req, res) => {
  try {
    const user = await req.user;
    user.tokens = user.tokens.filter(({ token }) => token !== req.token);
    await user.save();
    res.status(202).send({ success: 'Successfully logged out' });
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong' });
  }
};

// Log out of all sessions
exports.destroyAll = async (req, res) => {
  try {
    const user = await req.user;
    user.tokens = [];
    await user.save();
    res.status(202).send({ success: 'Successfully logged out from all devices' });
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong' });
  }
};
