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

  // Create the table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS testSchedules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      applicantId INT,
      user VARCHAR(255),
      date DATE,
      time TIME,
      location VARCHAR(255),
      accessorId INT,
      testStatus VARCHAR(255),
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

// Get all testSchedules
const getTestSchedules = (req, res) => {
  const query = "SELECT * FROM testSchedules ORDER BY createdAt DESC";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get single testSchedule
const getTestSchedule = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM testSchedules WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: "No such testSchedule" });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Get testSchedules by user ID
const getTestScheduleByUserId = (req, res) => {
  const { userId } = req.params;
  const query =
    "SELECT * FROM testSchedules WHERE user = ? ORDER BY createdAt DESC";

  connection.query(query, [userId], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Create testSchedule
const createTestSchedule = (req, res) => {
  const { applicantId, user, date, time, location, accessorId, testStatus } =
    req.body;
  const query =
    "INSERT INTO testSchedules (applicantId, user, date, time, location, accessorId, testStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [applicantId, user, date, time, location, accessorId, testStatus],
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
  const { testSchedules } = req.body;
  const allTestSchedule = [];

  testSchedules.forEach(
    ({ applicantId, user, date, time, location, accessorId, testStatus }) => {
      const query =
        "INSERT INTO testSchedules (applicantId, user, date, time, location, accessorId, testStatus) VALUES (?, ?, ?, ?, ?, ?, ?)";

      connection.query(
        query,
        [applicantId, user, date, time, location, accessorId, testStatus],
        (error, results) => {
          if (error) {
            res.status(400).json({ error: error.message });
          } else {
            allTestSchedule.push({ id: results.insertId });
          }
        }
      );
    }
  );

  res.status(200).json(allTestSchedule);
};

// Update testSchedule
const updateTestSchedule = (req, res) => {
  const { id } = req.params;
  const { applicantId, user, date, time, location, accessorId, testStatus } =
    req.body;
  const query =
    "UPDATE testSchedules SET applicantId=?, user=?, date=?, time=?, location=?, accessorId=?, testStatus=? WHERE id=?";

  connection.query(
    query,
    [applicantId, user, date, time, location, accessorId, testStatus, id],
    (error, results) => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "No such testSchedule" });
      } else {
        res.status(200).json({ message: "TestSchedule updated successfully" });
      }
    }
  );
};

// Delete testSchedule
const deleteTestSchedule = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM testSchedules WHERE id = ?";

  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "No such testSchedule" });
    } else {
      res.status(200).json({ message: "TestSchedule deleted successfully" });
    }
  });
};

// Close MySQL connection when the application exits
process.on("exit", () => {
  connection.end();
});

module.exports = {
  createTestSchedule,
  createBatch,
  getTestSchedules,
  getTestSchedule,
  updateTestSchedule,
  getTestScheduleByUserId,
  deleteTestSchedule,
};
