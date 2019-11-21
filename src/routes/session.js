const express = require('express');
const sessionsController = require('../controllers/sessions');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/v1/sessions', sessionsController.create);

router.delete('/v1/sessions', auth, sessionsController.destroy);

router.delete('/v1/sessionsAll', auth, sessionsController.destroyAll);

module.exports = router;
