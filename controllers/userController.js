const User = require('../models/User');

const getUser = async (req, res) => {
  if (!req?.params?.id){
    return res.status(400).json({ "message": "No ID provided for user search." });
  }
  const user = await User.findOne({ _id: req.params.id });
  if (!user){
    return res.status(204).json({ "message": `No user was found with ID ${req.params.id}` });
  }
  try {
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

const getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ 'message': 'No users were found' });
  }
  try {
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

const createUser = async (req, res) => {
  if (!req?.body?.username || !req.body?.email || !req?.body?.password) {
    return res.status(400).json({ 'messages': 'A username, email, and password must all be provided.' });
  }
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    console.log(user);
    res.status(200).json({ 'success': `User ${user.username} successfully created.` });
  } catch (error) {
    console.log(error);
  }
}

const editUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID required.' });
  }
  const user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(204).json({ 'message': `No show matches ID ${req.body.id}` });
  }
  if (req?.body?.username) user.username = req.body.username;
  if (req?.body?.email)    user.email    = req.body.email;
  if (req?.body?.password) user.password = req.body.password;
  const result = await user.save();
  console.log(result);
  res.status(200).json({ 'success': `Updated ${user.username}` });
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID required' });
  }  
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!show) {
    return res.status(404).json({ 'message': 'Not Found. No user matches this ID.' });
  }
  const deleteResult = await user.deleteOne();
  console.log(deleteResult);
  res.status(200).json({ 'success': 'Deleted the user account' });
} 

module.exports = { 
  getUser, getUsers, createUser, editUser, deleteUser
}