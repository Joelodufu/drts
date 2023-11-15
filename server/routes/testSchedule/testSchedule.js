const express = require("express");
const path = require("path");

const testScheduleController = require("../../controllers/testShceduleController");

const router = express.Router();

//get all testSchedules
router.get("/", testScheduleController.getTestSchedules);

//Get Single testSchedule
router.get("/:id", testScheduleController.getTestSchedule);

//POST a new testSchedule
router.post("/", testScheduleController.createTestSchedule);

//Post Batch TestSchedules

//get testSchedules by user ID
router.get("/user/:userId", testScheduleController.getTestScheduleByUserId);

//Delete an testSchedule
router.delete("/:id",   testScheduleController. deleteTestSchedule);
//Update an testSchedule
router.patch("/:id", testScheduleController.updateTestSchedule);

module.exports = router;
