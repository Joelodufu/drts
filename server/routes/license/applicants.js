const express = require("express");
const path = require("path");

const {
  createApplicant,
  creatBatch,
  getApplicants,
  getApplicant,
  updateApplicant,
  deleteApplicant,
  getApplicantsByUserId, // Import the new function
} = require("../../controllers/applicantController");

const filePath = path.join(__dirname, "../../Schools.json");

const router = express.Router();

//get all applicants
router.get("/", getApplicants);

//Get Single applicant
router.get("/:id", getApplicant);

//POST a new applicant
router.post("/", createApplicant);

//Post Batch Applicants
router.post("/batch", creatBatch);

// Add a new route to get applicants by user ID
router.get("/user/:userId", getApplicantsByUserId);

//Delete an applicant
router.delete("/:id", deleteApplicant);

//Update an applicant
router.patch("/:id", updateApplicant);

module.exports = router;
