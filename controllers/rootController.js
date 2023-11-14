const home = async (req, res) => {
  res.status(200).json({ 'message': 'this is the home page' });
}

module.exports = { home };
