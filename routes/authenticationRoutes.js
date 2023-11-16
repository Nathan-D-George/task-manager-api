const express = require('express');
const router  = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.route('/')
    .post(authenticationController.login);

module.exports = router;
