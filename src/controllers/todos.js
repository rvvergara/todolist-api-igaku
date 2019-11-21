const Todo = require('../models/todo');

exports.index = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.create = async (req, res) => {
  const todo = new Todo(req.body);
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
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    return todo ? res.status(202).send(todo) : res.status(404).send({ error: 'Cannot find todo' });
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.delete = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    return todo ? res.status(202).send({ success: 'Todo deleted' }) : res.status(404).send({ error: 'Cannot find todo' });
  } catch (e) {
    return res.status(500).send(e);
  }
};
