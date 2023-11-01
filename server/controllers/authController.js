const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If the email is not found, proceed with registration
    // Validate input
    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Verify the password using bcryptjs
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    // Generate and send a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    const role = user.role;
    res.status(200).json({ role, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Authentication failed. An error occurred." });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // User ID extracted from the token in verifyToken middleware

    // Retrieve user details based on the userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details as a response
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,

      // Add more user details as needed
    });
  } catch (error) {
    res.status(500).json({ message: "Error while retrieving user details" });
  }
};

module.exports = { register, login, getUserDetails };
