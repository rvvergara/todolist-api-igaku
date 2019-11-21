const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Todo = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Welcome from express');
});

app.post('/v1/users', async (req, res) => {
  const user = await new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(422).send(e);
  }
});

app.post('/v1/sessions', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});

app.post('/v1/todos', async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (e) {
    res.status(422).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server running and listening to port ${port}`);
});
