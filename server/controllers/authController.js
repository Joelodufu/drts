const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getDbConnection = async () => {
  const pool = await mysql.createPool({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER_NAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    port: process.env.DEV_DB_PORT,
  });
  return pool;
};

const ensureUsersTable = async () => {
  const pool = await getDbConnection();

  try {
    const [tables] = await pool.query("SHOW TABLES LIKE 'users'");
    const tableExists = tables.length > 0;

    if (!tableExists) {
      await pool.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50), -- Add your role field
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  } catch (error) {
    console.error("Error creating 'users' table:", error.message);
  }
};

const register = async (req, res) => {
  const pool = await getDbConnection();

  try {
    await ensureUsersTable();

    const { firstName, lastName, email, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (firstName, lastName, email, password,role) VALUES (?, ?, ?, ?,?)",
      [firstName, lastName, email, hashedPassword, "user"]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  const pool = await getDbConnection();

  try {
    const { email, password } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    const role = user.role;
    res.status(200).json({ role, token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Authentication failed. An error occurred." });
  }
};

const getUserDetails = async (req, res) => {
  const pool = await getDbConnection();

  try {
    const userId = req.userId;
    console.log(userId);
    const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getUserDetails };
