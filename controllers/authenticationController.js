const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const bcrypt = require('bcrypt'); 

const login = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ 'missing': 'Username and password required' });
  }

  const userExists = await User.findOne({ username: user });
  if (!userExists) {
    return res.status(404).json({ 'not found': 'user' });
  }

  const match = await bcrypt.compare(password, userExists.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign({
        "UserInfo": {
          "username": userExists.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { "username": userExists.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    userExists.refreshToken - refreshToken;
    const result = await userExists.save();
    console.log(result);
    console.log(roles);

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: 'None', maxAge:24*60*60100 });
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
}

module.exports = { login };