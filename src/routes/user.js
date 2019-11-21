const express = require('express');
const usersController = require('../controllers/users');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/v1/users/me', auth, usersController.show);

router.post('/v1/users', usersController.create);

router.put('/v1/users/me', auth, usersController.update);

router.delete('/v1/users/me', auth, usersController.destroy);

module.exports = router;
