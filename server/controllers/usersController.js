const mysql = require("mysql2");

// Assuming you have a configured MySQL connection
const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12662397",
  password: "emr87xH41j",
  database: "sql12662397",
  port: 3306,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Get all Users
const getUsers = (req, res) => {
  const query =
    "SELECT id, firstName, lastName, role, email FROM users ORDER BY createdAt DESC";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get single User
const getUser = (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT firstName, lastName, role, email FROM users WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: "No such User" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Update User
const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;
  const query =
    "UPDATE users SET firstName=?, lastName=?, email=?, role=? WHERE id=?";

  connection.query(
    query,
    [firstName, lastName, email, role, id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "No such user" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
};

// Delete User
const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "No such User" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
};

// Close MySQL connection when the application exits
process.on("exit", () => {
  connection.end();
});

module.exports = {
  getUsers,
  updateUser,
  getUser,
  deleteUser,
};
