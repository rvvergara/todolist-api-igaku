const express = require('express');
const sessionsController = require('../controllers/sessions');

const router = new express.Router();

router.post('/v1/sessions', sessionsController.create);

module.exports = router;
