const Task = require('../models/Task'); 


const searchTask = async (req, res) => {
  const task = await Task.find( req.query );
  try {
    if (!task) {
      return res.status(404).json({ 'message': 'no task matching id found.' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.sendStatus(400);
  }
}

const getTask = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'message': 'no query string provided.' });
  }
  console.log(req.params.id);
  const task = await Task.findById( req.params.id );
  if (!task) {
    return res.status(404).json({ 'not found': 'No Task with Matching ID was found!' });
  }
  res.status(200).json(task);
}

const getTasks = async (req, res) => {  
  const tasks = await Task.find(); 
  if (!tasks) { 
    console.log('No tasks were found by the program.'); 
    return res.status(204).json({ 'messages': 'No tasks found.' }); 
  } 
  try {
    res.json(tasks);
  } catch (error) {
    console.log(error);
  } 
} 
 
const createTask = async (req, res) => {
  if (!req?.body?.instruction || !req?.body?.assignee || !req?.body?.complete) {
    console.log(`${req.body.instruction} ${req.body.assignee} ${req.body.complete}` );
    return res.status(400).json({ 'message': 'Task parameters must all be provided.' });
  }

  const taskExists = await Task.findOne({ "instruction": req.body.instruction });
  if (taskExists) {
    return res.status(409).json({ "conflict": `Task already exists.` });
  }

  try {
    const task = await Task.create({
      "instruction": req.body.instruction, 
      "assignee":    req.body.assignee, 
      "complete":    req.body.complete 
    });
    console.log(task);
    // res.status(201).json({ 'success': `created task for ${task.instruction}` });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

const editTask = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Task ID required' });
  }

  const task = await Task.findOne({ '_id': req.body.id });
  if (!task){
    return res.status(204).json({ 'message': 'No Task with given ID exists' });
  }

  try {
    if (req?.body?.instruction) { task.instruction = req.body.instruction; }
    if (req?.body?.assignee)    { task.assignee    = req.body.assignee; }
    if (req?.body?.complete)    { task.complete    = req.body.complete; }
    task.save();
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

const deleteTask = async (req, res) => {
  if (!req?.body?.id) { 
    return res.status(400).json({ 'problem': 'Task ID required.' }); 
  }
  const task = await Task.findOne({ '_id': req.body.id });
  if (!task) {
    return res.status(400).json({ 'problem': 'no task matching ID exists' });
  }
  try {
    const deleteResult = await task.deleteOne();
    console.log(deleteResult);
    res.status(200).json({ 'message': 'One  Task successfully deleted' });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

module.exports = { 
  getTask, getTasks, createTask, editTask, deleteTask, searchTask
}

/*
 *  4 areas
 *   grace       - grace (receive grace even after salvation)
 *   prayer      - war   ( prayer, praise, petition, protection, proclaimation)
 *   servanthood - humility 
 *   worship     - abandonment (to God who is all powerful, all knowing, all present)
 */