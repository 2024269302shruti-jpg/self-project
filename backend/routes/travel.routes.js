const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// For authenticated users to save searches: Option to pass auth header or not
// We can use a loose middleware that populates req.user if token is present, else allows without token.

const optionalAuth = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) req.user = user;
      next();
    });
  } else {
    next();
  }
};

router.post('/plan', optionalAuth, travelController.planTravel);

module.exports = router;
