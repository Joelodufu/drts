const express = require("express");
const path = require("path");

const {
  createSchool,
  creatBatch,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
} = require("../../controllers/schoolController");

const filePath = path.join(__dirname, "../../Schools.json");

const router = express.Router();

//get all school
router.get("/", getSchools);

//Get Single School
router.get("/:id", getSchool);

//POST a new School
router.post("/", createSchool);

//Post Batch

router.post("/batch", creatBatch);

//Delete a new School
router.delete("/:id", deleteSchool);
//Update a new School
router.patch("/:id", updateSchool);

module.exports = router;
