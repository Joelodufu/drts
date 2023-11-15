const express = require("express");
const mysql = require("mysql2"); // Import the mysql2 package
const schoolRoute = require("./routes/schools/school");
const LicenseRoute = require("./routes/license/applicants");
const AccessorRoute = require("./routes/accessors/accessors");
const TestScheduleRoute = require("./routes/testSchedule/testSchedule");
const AuthRoute = require("./routes/authRoute");
const UserRoute = require("./routes/users/users");
const LocationRoute = require("./routes/location/location");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan"); // Import Morgan

// Create a MySQL connection pool
const db = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12662397",
  password: "emr87xH41j",
  database: "sql12662397",
  port: 3306,
});

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan("dev"));

// Your existing middleware for request logging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/schools", schoolRoute);
app.use("/api/license", LicenseRoute);
app.use("/api/accessors", AccessorRoute);
app.use("/api/testSchedules", TestScheduleRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/location", LocationRoute);

// Connect to the MySQL database
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  }
});
