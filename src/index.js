require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routes/user');
const sessionRouter = require('./routes/session');
const todoRouter = require('./routes/todo');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(sessionRouter);
app.use(todoRouter);

app.get('/', async (req, res) => {
  res.send('Welcome from express');
});

app.listen(port, () => {
  console.log(`Server running and listening to port ${port}`);
});
