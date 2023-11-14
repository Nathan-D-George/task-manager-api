const about = async (req, res) => {
  res.status(200).json({ 'message': 'this is from the about page' });
}

module.exports = { about };