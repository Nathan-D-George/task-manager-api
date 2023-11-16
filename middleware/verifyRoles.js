const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({ 'missing': 'roles not provided' });
    }
    const rolesArray = [...allowedRoles];
    const result     = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if (!result) {
      return res.sendStatus(404);
      next();
    }
  }
}

module.exports = verifyRoles;