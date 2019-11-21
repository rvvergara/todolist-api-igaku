const express = require('express');
require('./db/mongoose');
const Todo = require('./models/todo');
const userRouter = require('./routes/user');
const sessionRouter = require('./routes/session');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(sessionRouter);

app.get('/', async (req, res) => {
  res.send('Welcome from express');
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
