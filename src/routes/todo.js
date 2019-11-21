const express = require('express');
const todosController = require('../controllers/todos');

const router = new express.Router();

router.get('/v1/todos', todosController.index);

router.post('/v1/todos', todosController.create);

router.put('/v1/todos/:id', todosController.update);

router.delete('/v1/todos/:id', todosController.delete);

module.exports = router;
