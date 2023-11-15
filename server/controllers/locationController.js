const mysql = require("mysql2");

// Assuming you have a configured MySQL connection
const connection = mysql.createConnection({
  host: process.env.DEV_DB_HOST,
  user: process.env.DEV_DB_USER_NAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_NAME,
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
    CREATE TABLE IF NOT EXISTS location (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

// Get all locations
const getLocations = (req, res) => {
  const query = "SELECT * FROM location ORDER BY createdAt DESC";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get single location
const getLocation = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM locations WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: "No such location" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};


// Create location
const createLocation = (req, res) => {
  const { name, address } =
    req.body;
  const query =
    "INSERT INTO location (name, address) VALUES (?, ?)";

  connection.query(
    query,
    [name, address],
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
const creatBatch = (req, res) => {
  const { locations } = req.body;
  const allLocation = [];

  locations.forEach(
    ({ name, address }) => {
      const query =
        "INSERT INTO locations (name, address) VALUES (?, ?, ?, ?, ?, ?, ?)";

      connection.query(
        query,
        [name, address],
        (error, results) => {
          if (error) {
            res.status(400).json({ error: error.message });
          } else {
            allLocation.push({ id: results.insertId });
          }
        }
      );
    }
  );

  res.status(200).json(allLocation);
};

// Update location
const updateLocation = (req, res) => {
  const { id } = req.params;
  const { name, address } =
    req.body;
  const query =
    "UPDATE location SET name=?, address=? WHERE id=?";

  connection.query(
    query,
    [name, address, id],
    (error, results) => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "No such location" });
      } else {
        res.status(200).json({ message: "Location updated successfully" });
      }
    }
  );
};

// Delete location
const deleteLocation = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM locations WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "No such location" });
    } else {
      res.status(200).json({ message: "Location deleted successfully" });
    }
  });
};

// Close MySQL connection when the application exits
process.on("exit", () => {
  connection.end();
});

module.exports = {
  createLocation,
  creatBatch,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
