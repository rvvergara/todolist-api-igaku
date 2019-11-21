const express = require('express');
const todosController = require('../controllers/todos');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/v1/todos', auth, todosController.index);

router.post('/v1/todos', auth, todosController.create);

router.put('/v1/todos/:id', auth, todosController.update);

router.delete('/v1/todos/:id', auth, todosController.delete);

module.exports = router;
