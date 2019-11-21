const express = require('express');
const usersController = require('../controllers/users');

const router = new express.Router();

router.get('/v1/users/:id', usersController.show);

router.post('/v1/users', usersController.create);

router.put('/v1/users/:id', usersController.update);

router.delete('/v1/users/:id', usersController.destroy);

module.exports = router;
