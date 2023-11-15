const User = require('../models/User');

const searchUser = async (req, res) => {
  const user = await User.find( req.query);
  try {    
    if (!user){
      res.status(404).json({ 'NOT FOUND': 'no user found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ 'error': error });
  }
}

const getUser = async (req, res) => {
  if (!req?.params?.id){
    return res.status(400).json({ 'missing': 'no parameters provided.' });
  }
  try {
    const user = await User.findById( req.params.id );
    if (!user) {
      return res.status(404).json({ 'NOT FOUND': 'No user found matching the given parameter(s)' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ 'error': error });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) { 
      return res.status(404).json({ 'NOT FOUND': 'No Users found' });
    }
    res.status(200).json( users );
  } catch (error) {
    res.sendStatus(400);
  }
}
 
const createUser = async (req, res) => {
  if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
    return res.status(400).json({ 'problem': 'username, email and password are all required!' });
  }
  const userExistsAlready = await User.findOne({ username: req.body.username });
  if (userExistsAlready) {
    return res.status(409).json({ 'CONFLICT': 'Username is already in use. Pcik another one.' });
  }
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    res.status(200).json({ 'success': `user ${user.username} successfully created!` });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

const editUser = async (req, res) => {
  if (!req?.body?.id){
    return res.status(404).json({ 'problem': 'user id must be provided' });
  }
  const user = await User.findById( req.body.id );
  if (!user) {
    return res.status(400).json ({ 'NOT FOUND': 'No user with provided id' });
  }   
  try {
    if (req.body.username) { user.username = req.body.username }
    if (req.body.email)    { user.email    = req.body.email    }
    if (req.body.password) { user.password = req.body.password }
    const result = await user.save();
    console.log(result);
    res.status(209).json({ 'success': 'Successfully updated user' });
  } catch(error) {
    console.log(error);
    res.sendStatus(404);
  }
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'missing': 'user id not provided' });
  }
  const user = await User.findById( req.body.id );
  if (!user) {
    return res.status(404).json({ 'NOT FOUND': 'no user with this id was found' });
  }
  try {
    const result = await user.deleteOne();
    console.log(result);
    res.status(200).json ({ 'succes': 'successfully deleted the user' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ 'error': error });
  }
}

module.exports = { 
  getUser, getUsers, createUser, editUser, deleteUser, searchUser
}
