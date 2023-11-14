const rootController = require('../controllers/rootController');
const express = require('express');
const router  = express.Router();

router.route('/').get(rootController.home);

module.exports = router;
