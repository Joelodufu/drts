const express = require("express");
const path = require("path");

const {
  createUser,
  creatBatch,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/applicantController");

const filePath = path.join(__dirname, "../../Schools.json");

const router = express.Router();

//get all applicants
router.get("/", getUsers);

//Get Single applicant
router.get("/:id", getUser);

//POST a new applicant
router.post("/", createUser);

//Post Batch Users

router.post("/batch", creatBatch);

//Delete an applicant
router.delete("/:id", deleteUser);
//Update an applicant
router.patch("/:id", updateUser);

module.exports = router;
