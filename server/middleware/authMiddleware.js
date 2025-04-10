const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ msg: 'No token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err)
      return res.status(401).json({ msg: 'Unauthorized' });

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
