const Todo = require('../models/todo');

exports.index = async (req, res) => {
  try {
    await req.user.populate('todos').execPopulate();
    res.send(req.user.todos);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.create = async (req, res) => {
  const todo = new Todo({
    ...req.body,
    owner: req.user,
  });
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (e) {
    res.status(422).send(e);
  }
};

exports.update = async (req, res) => {
  const allowedFields = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((field) => allowedFields.includes(field));

  if (!isValid) {
    return res.status(422).send({ error: 'Disallowed field/s' });
  }

  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).send({ error: 'Cannot find todo' });
    }
    updates.forEach(field => todo[field] = req.body[field]);
    await todo.save();
    return res.status(202).send(todo);
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.delete = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send({ error: 'Cannot find todo' });
    }
    return res.status(202).send({ success: 'Todo deleted' });
  } catch (e) {
    return res.status(500).send(e);
  }
};
