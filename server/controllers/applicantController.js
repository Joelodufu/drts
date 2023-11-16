const mysql = require("mysql2/promise");
require("dotenv").config();

const getDbConnection = async () => {
  const db = await mysql.createPool({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER_NAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    port: process.env.DEV_DB_PORT,
  });
  return db;
};

const createApplicantsTable = async (db) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS applicants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        dateofBirth DATE NOT NULL,
        user VARCHAR(255) NOT NULL,
        gender VARCHAR(10),
        nationality VARCHAR(50),
        bloodGroup VARCHAR(5),
        nationalIDNumber VARCHAR(20),
        address TEXT,
        phoneNumber VARCHAR(20),
        email VARCHAR(255),
        nextOfKinsAddress TEXT,
        proccessingCenter VARCHAR(255),
        licenseType VARCHAR(50),
        paymentMethod VARCHAR(50),
        passport VARCHAR(255),
        legalID VARCHAR(255),
        proofOfAddress VARCHAR(255),
        eyeTestCeritificate VARCHAR(255),
        driversPermit VARCHAR(255),
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

      )
    `);
    console.log("Applicants table created or already exists.");
  } catch (error) {
    console.error("Error creating applicants table:", error.message);
  }
};

const getApplicants = async (req, res) => {
  const db = await getDbConnection();
  await createApplicantsTable(db);

  try {
    const [rows] = await db.query(
      "SELECT * FROM applicants ORDER BY timestamp DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.end();
  }
};

const getApplicant = async (req, res) => {
  const { id } = req.params;
  const db = await getDbConnection();
  await createApplicantsTable(db);

  try {
    const [rows] = await db.query("SELECT * FROM applicants WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "No such applicant" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.end();
  }
};

const getApplicantsByUserId = async (req, res) => {
  const { userId } = req.params;
  const db = await getDbConnection();
  await createApplicantsTable(db);

  try {
    const [rows] = await db.query("SELECT * FROM applicants WHERE user = ?", [
      userId,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.end();
  }
};

const createApplicant = async (req, res) => {
  const {
    fullName,
    dateofBirth,
    user,
    gender,
    nationality,
    bloodGroup,
    nationalIDNumber,
    address,
    phoneNumber,
    email,
    nextOfKinsAddress,
    proccessingCenter,
    licenseType,
    paymentMethod,
    passport,
    legalID,
    proofOfAddress,
    eyeTestCeritificate,
    driversPermit,
  } = req.body;

  // Parse the dateofBirth string into a Date object
  const parsedDateofBirth = new Date(dateofBirth);

  const db = await getDbConnection();
  await createApplicantsTable(db);

  try {
    const [result] = await db.query(
      "INSERT INTO applicants (fullName, dateofBirth, user, gender, nationality, bloodGroup, nationalIDNumber, address, phoneNumber, email, nextOfKinsAddress, proccessingCenter, licenseType, paymentMethod, passport, legalID, proofOfAddress, eyeTestCeritificate, driversPermit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        fullName,
        parsedDateofBirth,
        user,
        gender,
        nationality,
        bloodGroup,
        nationalIDNumber,
        address,
        phoneNumber,
        email,
        nextOfKinsAddress,
        proccessingCenter,
        licenseType,
        paymentMethod,
        passport,
        legalID,
        proofOfAddress,
        eyeTestCeritificate,
        driversPermit,
      ]
    );

    res
      .status(200)
      .json({ message: "Applicant created successfully", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.end();
  }
};

const createBatch = async (req, res) => {
  const { applicants } = req.body;
  const db = await getDbConnection();
  await createApplicantsTable(db);

  const allApplicants = [];

  for (const applicantData of applicants) {
    const {
      fullName,
      dateofBirth,
      user,
      gender,
      nationality,
      bloodGroup,
      nationalIDNumber,
      address,
      phoneNumber,
      email,
      nextOfKinsAddress,
      proccessingCenter,
      licenseType,
      paymentMethod,
      passport,
      legalID,
      proofOfAddress,
      eyeTestCeritificate,
      driversPermit,
    } = applicantData;

    // Parse the dateofBirth string into a Date object
    const parsedDateofBirth = new Date(dateofBirth);

    try {
      const [result] = await db.query(
        "INSERT INTO applicants (fullName, dateofBirth, user, gender, nationality, bloodGroup, nationalIDNumber, address, phoneNumber, email, nextOfKinsAddress, proccessingCenter, licenseType, paymentMethod, eyeTestCeritificate, driversPermit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          fullName,
          parsedDateofBirth,
          user,
          gender,
          nationality,
          bloodGroup,
          nationalIDNumber,
          address,
          phoneNumber,
          email,
          nextOfKinsAddress,
          proccessingCenter,
          licenseType,
          paymentMethod,
          eyeTestCeritificate,
          driversPermit,
        ]
      );

      allApplicants.push({ id: result.insertId, ...applicantData });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  res.status(200).json(allApplicants);
};

const updateApplicant = async (req, res) => {
  const { id } = req.params; // Assuming the applicant ID is passed in the URL parameters
  const updateFields = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Applicant ID is required for updating." });
  }

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  const db = await getDbConnection();

  try {
    // Generate the SET part of the SQL query dynamically based on the fields in the request body
    const updateQuery = Object.keys(updateFields)
      .map((field) => `${field} = ?`)
      .join(", ");

    const updateValues = Object.values(updateFields);

    // Add the applicant ID to the values array for the WHERE clause
    updateValues.push(id);

    // Construct the complete SQL query
    const sql = `UPDATE applicants SET ${updateQuery} WHERE id = ?`;

    const [result] = await db.query(sql, updateValues);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Applicant updated successfully" });
    } else {
      res.status(404).json({ error: "Applicant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.end();
  }
};

const deleteApplicant = async (req, res) => {
  const { id } = req.params;
  const db = await getDbConnection();
  await createApplicantsTable(db);

  try {
    const [result] = await db.query("DELETE FROM applicants WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No such applicant" });
    }
    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.end();
  }
};

module.exports = {
  createApplicant,
  getApplicantsByUserId, // Added missing function
  createBatch,
  getApplicants,
  getApplicant,
  updateApplicant,
  deleteApplicant,
};
