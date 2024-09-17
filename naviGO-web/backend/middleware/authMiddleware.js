const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { JWT_SECRET } = process.env; // Ensure you have JWT_SECRET in your .env file

const verifyToken = promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = await verifyToken(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };
