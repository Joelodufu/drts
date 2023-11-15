const express = require("express");
const router = express.Router();
const {
  createApplicant,
  getApplicants,
  getApplicant,
  updateApplicant,
  deleteApplicant,
  getApplicantsByUserId,
  createBatch,
} = require("../../controllers/applicantController");

// Routes for applicants
router.get("/", getApplicants);
router.get("/:id", getApplicant);
router.get("/user/:userId", getApplicantsByUserId); // Added route to get applicants by user ID
router.post("/", createApplicant);
router.post("/batch", createBatch);
router.put("/:id", updateApplicant);
router.delete("/:id", deleteApplicant);

module.exports = router;
