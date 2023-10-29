const express = require("express");
const path = require("path");

const {
  createTestSchedule,
  creatBatch,
  getTestSchedules,
  getTestSchedule,
  updateTestSchedule,
  deleteTestSchedule,
  getTestScheduleByUserId,
} = require("../../controllers/testShceduleController");

const router = express.Router();

//get all testSchedules
router.get("/", getTestSchedules);

//Get Single testSchedule
router.get("/:id", getTestSchedule);

//POST a new testSchedule
router.post("/", createTestSchedule);

//Post Batch TestSchedules

router.post("/batch", creatBatch);

//get testSchedules by user ID
router.get("/user/:userId", getTestScheduleByUserId);

//Delete an testSchedule
router.delete("/:id", deleteTestSchedule);
//Update an testSchedule
router.patch("/:id", updateTestSchedule);

module.exports = router;
