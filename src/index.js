const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Welcome from express');
});

app.listen(port, () => {
  console.log(`Server running and listening to port ${port}`);
});
