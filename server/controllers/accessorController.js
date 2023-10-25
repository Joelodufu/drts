const Accessor = require("../models/accessorModel");
const mongoose = require("mongoose");
//gel all accessor
const getAccessors = async (req, res) => {
  const accessors = await Accessor.find({}).sort({ createdAt: -1 });

  res.status(200).json(accessors);
};
//get single accessor
const getAccessor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such accessor" });
  }

  const accessor = await Accessor.findById(id);

  if (!accessor) {
    return res.status(404).json({ error: "No Such Accessor" });
  }

  res.status(200).json(accessor);
};

//create accessor
const createAccessor = async (req, res) => {
  const { name, address, accreditionNumber, image } = req.body;

  //add to db
  try {
    const accessor = await Accessor.create({
      name,
      address,
      accreditionNumber,
      image,
    });
    res.status(200).json(accessor);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Create Batch

const creatBatch = (req, res) => {
  const allAccessor = [];
  const { accessors } = req.body;
  accessors.forEach(async ({ name, address, accreditionNumber, image }) => {
    try {
      const accessor = await Accessor.create({
        name,
        address,
        accreditionNumber,
        image,
      });
      allAccessor.push(accessor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  res.status(200).json(allAccessor);
};

//update accessor

// Update accessor
const updateAccessor = async (req, res) => {
  const { id } = req.params;
  const { name, address, accreditionNumber, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such accessor" });
  }

  try {
    const updatedAccessor = await Accessor.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedAccessor) {
      return res.status(404).json({ error: "No such accessor" });
    }

    res.status(200).json(updatedAccessor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete accessor
const deleteAccessor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such accessor" });
  }

  try {
    const deletedAccessor = await Accessor.findByIdAndRemove(id);

    if (!deletedAccessor) {
      return res.status(404).json({ error: "No such accessor" });
    }

    res.status(200).json({ message: "Accessor deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAccessor,
  creatBatch,
  getAccessors,
  getAccessor,
  updateAccessor,
  deleteAccessor,
};
