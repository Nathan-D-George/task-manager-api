const User = require('../models/User');
const jwt  = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (! cookies?.jwt) {
    return res.status(401).json({ 'missing': 'no jwt' });
  }

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    return res.status(403).json({ 'forbidden': 'you are forbidden from continuing this action' });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || user.username !== decoded.username) { return res.sendStatus(403); }
      const roles = Object.values(user.roles);
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": decoded/username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '40s' }
      );
      res.json({ roles, accessToken });
    }
  );
}

module.exports = { handleRefreshToken };