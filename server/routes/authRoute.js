const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library for token verification

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is sent in the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Protected endpoint for retrieving user details
router.get("/user-details", verifyToken, authController.getUserDetails);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
