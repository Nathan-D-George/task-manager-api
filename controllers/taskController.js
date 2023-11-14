const Task = require('../models/Task');

const getTasks = async (req, res) => { 
  try{
    const tasks = await Task.find();
    if(!tasks){
      return res.status(204).json({ 'message': 'No tasks found.' });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ 'message': 'Tasks Not Found!' });
    console.log(error);
  }
}

const getTask = async (req, res) => {
  if (!req.query){
    return res.status(204).json({ 'message': 'no query string provided.' });
  }
  // const task = await Task.find({ name: req.query.name });
  try{
    if (!task){
      return res.status(204).json({ 'message': 'no task matching query found.' });
    }
    res.status(200).json(task);
  } catch (error){
    res.sendStatus(400);
  }
}

const createTask = async (req, res) => {
  if (!req?.body?.instruction || !req?.body?.assignee || !req?.body?.complete) {
    console.log(`${req.body.instruction} ${req.body.assignee} ${req.body.complete}` );
    return res.status(400).json({ 'message': 'Task parameters must all be provided.' });
  }

  try {
    const task = await Task.create({
      instruction: req.body.instruction, 
      assignee: req.body.assignee, 
      complete: req.body.complete 
    });
    console.log(task);
    // res.status(201).json({ 'success': `created task for ${task.instruction}` });
    res.status(201).json(task);
  } catch (error){
    console.log(error);
    res.sendStatus(400);
  }
}

const editTask = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Task ID required' });
  }
  let task = await Task.findOne({ _id: req.body.id });
  if (!task){
    return res.status(204).json({ 'message': 'No Task with given ID exists' });
  }
  try {
    if (req?.body?.instruction) task.instruction = req.body.instruction;
    if (req?.body?.assignee)    task.assignee    = req.body.assignee;
    if (req?.body?.complete)    task.complete    = req.body.complete;
    task.save();
    res.status(200).json(task);
  } catch (error){
    console.log(error);
    res.sendStatus(400);
  }
}

const deleteTask = async (req, res) => {
  if (!req?.body?.id) { 
    return res.status(204).json({ 'message': 'Task ID required.' }); 
  }
  const task = await Task.findOne({ _id: req.body.id });
  if (!task) {
    return res.status(204).json({ 'message': 'no task matching ID exists' });
  }
  try {
    const deleteResult = await task.deleteOne();
    console.log(deleteResult);
    res.status(200).json({ 'message': 'One  Task successfully deleted' });
  } catch (error){
    console.log(error);
    res.sendStatus(400);
  }
}

module.exports = { 
  getTask, getTasks, createTask, editTask, deleteTask 
}
