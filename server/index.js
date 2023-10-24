const express = require("express");
const mongoose = require("mongoose");
const schoolRoute = require("./routes/schools/school");
const LicenseRoute = require("./routes/license/applicants");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan"); // Import Morgan

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan("dev")); // Use Morgan in "dev" format

// Your existing middleware for request logging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/schools", schoolRoute);
app.use("/api/license", LicenseRoute);
const port = 5000;

// Connect to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Connected to the database and listening on port ${port}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
