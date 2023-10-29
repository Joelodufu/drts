const TestSchedule = require("../models/testScheduleModel");
const mongoose = require("mongoose");
//gel all testSchedule
const getTestSchedules = async (req, res) => {
  const testSchedules = await TestSchedule.find({}).sort({ createdAt: -1 });

  res.status(200).json(testSchedules);
};
//get single testSchedule
const getTestSchedule = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such testSchedule" });
  }

  const testSchedule = await TestSchedule.findById(id);

  if (!testSchedule) {
    return res.status(404).json({ error: "No Such TestSchedule" });
  }

  res.status(200).json(testSchedule);
};

//get schedules by user id

//Get applicants by user ID
const getTestScheduleByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming the user ID is passed as a route parameter

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const testSchedules = await TestSchedule.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(testSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create testSchedule
const createTestSchedule = async (req, res) => {
  const { applicantId, user, date, time, location, accessorId, testStatus } =
    req.body;

  //add to db
  try {
    const testSchedule = await TestSchedule.create({
      applicantId,
      user,
      date,
      time,
      location,
      accessorId,
      testStatus,
    });
    res.status(200).json(testSchedule);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Create Batch

const creatBatch = (req, res) => {
  const allTestSchedule = [];
  const { testSchedules } = req.body;
  testSchedules.forEach(
    async ({
      applicantId,
      user,
      date,
      time,
      location,
      accessorId,
      testStatus,
    }) => {
      try {
        const testSchedule = await TestSchedule.create({
          applicantId,
          user,
          date,
          time,
          location,
          accessorId,
          testStatus,
        });
        allTestSchedule.push(testSchedule);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  res.status(200).json(allTestSchedule);
};

//update testSchedule

// Update testSchedule
const updateTestSchedule = async (req, res) => {
  const { id } = req.params;
  const { applicantId, user, date, time, location, accessorId, testStatus } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such testSchedule" });
  }

  try {
    const updatedTestSchedule = await TestSchedule.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedTestSchedule) {
      return res.status(404).json({ error: "No such testSchedule" });
    }

    res.status(200).json(updatedTestSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete testSchedule
const deleteTestSchedule = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such testSchedule" });
  }

  try {
    const deletedTestSchedule = await TestSchedule.findByIdAndRemove(id);

    if (!deletedTestSchedule) {
      return res.status(404).json({ error: "No such testSchedule" });
    }

    res.status(200).json({ message: "TestSchedule deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTestSchedule,
  creatBatch,
  getTestSchedules,
  getTestSchedule,
  updateTestSchedule,
  getTestScheduleByUserId,
  deleteTestSchedule,
};
