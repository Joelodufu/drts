const School = require("../models/schoolModel");
const mongoose = require("mongoose");
//gel all school
const getSchools = async (req, res) => {
  const schools = await School.find({}).sort({ createdAt: -1 });

  res.status(200).json(schools);
};
//get single school
const getSchool = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such school" });
  }

  const school = await School.findById(id);

  if (!school) {
    return res.status(404).json({ error: "No Such School" });
  }

  res.status(200).json(school);
};

//create school
const createSchool = async (req, res) => {
  const { name, address, accreditionNumber, image } = req.body;

  //add to db
  try {
    const school = await School.create({
      name,
      address,
      accreditionNumber,
      image,
    });
    res.status(200).json(school);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Create Batch

const creatBatch = (req, res) => {
  const allSchools = [];
  const { schools } = req.body;
  schools.forEach(async ({ name, address, accreditionNumber, image }) => {
    try {
      const school = await School.create({
        name,
        address,
        accreditionNumber,
        image,
      });
      allSchools.push(school);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  res.status(200).json(allSchools);
};

//update school

// Update school
const updateSchool = async (req, res) => {
  const { id } = req.params;
  const { name, address, accreditionNumber, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such school" });
  }

  try {
    const updatedSchool = await School.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedSchool) {
      return res.status(404).json({ error: "No such school" });
    }

    res.status(200).json(updatedSchool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete school
const deleteSchool = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such school" });
  }

  try {
    const deletedSchool = await School.findByIdAndRemove(id);

    if (!deletedSchool) {
      return res.status(404).json({ error: "No such school" });
    }

    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSchool,
  creatBatch,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
};
