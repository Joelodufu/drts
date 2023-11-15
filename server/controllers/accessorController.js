const mysql = require("mysql2");

// Assuming you have a configured MySQL connection
const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12662397",
  password: "emr87xH41j",
  database: "sql12662397",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);

  // Create the table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS accessors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      activStatus VARCHAR(255),
      phone VARCHAR(20),
      email VARCHAR(255),
      address VARCHAR(255),
      image VARCHAR(255),
                 timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    )
  `;

  connection.query(createTableQuery, (createError) => {
    if (createError) {
      console.error("Error creating table: " + createError.message);
    } else {
      console.log("Table created or already exists");
    }
  });
});

// Get all accessors
const getAccessors = (req, res) => {
  const query = "SELECT * FROM accessors ORDER BY createdAt DESC";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get single accessor
const getAccessor = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM accessors WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: "No such accessor" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Create accessor
const createAccessor = (req, res) => {
  const { name, activStatus, phone, email, address, image } = req.body;
  const query =
    "INSERT INTO accessors (name, activStatus, phone, email, address, image) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [name, activStatus, phone, email, address, image],
    (error, results) => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(200).json({ id: results.insertId });
      }
    }
  );
};

// Create Batch
const createBatch = (req, res) => {
  const { accessors } = req.body;
  const allAccessor = [];

  accessors.forEach(({ name, activStatus, phone, email, address, image }) => {
    const query =
      "INSERT INTO accessors (name, activStatus, phone, email, address, image) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(
      query,
      [name, activStatus, phone, email, address, image],
      (error, results) => {
        if (error) {
          res.status(400).json({ error: error.message });
        } else {
          allAccessor.push({ id: results.insertId });
        }
      }
    );
  });

  res.status(200).json(allAccessor);
};

// Update accessor
const updateAccessor = (req, res) => {
  const { id } = req.params;
  const { name, activStatus, phone, email, address, image } = req.body;
  const query =
    "UPDATE accessors SET name=?, activStatus=?, phone=?, email=?, address=?, image=? WHERE id=?";

  connection.query(
    query,
    [name, activStatus, phone, email, address, image, id],
    (error, results) => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "No such accessor" });
      } else {
        res.status(200).json({ message: "Accessor updated successfully" });
      }
    }
  );
};

// Delete accessor
const deleteAccessor = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM accessors WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "No such accessor" });
    } else {
      res.status(200).json({ message: "Accessor deleted successfully" });
    }
  });
};

// Close MySQL connection when the application exits
process.on("exit", () => {
  connection.end();
});

module.exports = {
  createAccessor,
  createBatch,
  getAccessors,
  getAccessor,
  updateAccessor,
  deleteAccessor,
};
