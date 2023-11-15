const taskController = require('../controllers/taskController');
const express = require('express');
const router  = express.Router();

router.route('/')
    .get(   taskController.getTasks)
    .post(  taskController.createTask)
    .put(   taskController.editTask)
    .delete(taskController.deleteTask);

router.route('/:id')
    .get(taskController.getTask);
router.route('/search')
    .get(taskController.searchTask);

module.exports = router;