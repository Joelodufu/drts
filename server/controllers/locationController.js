const Location = require("../models/locationModel");
const mongoose = require("mongoose");
//gel all location
const getLocations = async (req, res) => {
  const locations = await Location.find({}).sort({ createdAt: -1 });

  res.status(200).json(locations);
};
//get single location
const getLocation = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such location" });
  }

  const location = await Location.findById(id);

  if (!location) {
    return res.status(404).json({ error: "No Such Location" });
  }

  res.status(200).json(location);
};

//create location
const createLocation = async (req, res) => {
  const { name, address } = req.body;

  //add to db
  try {
    const location = await Location.create({
      name,
      address,
    });
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Create Batch

const creatBatch = (req, res) => {
  const allLocations = [];
  const { locations } = req.body;
  locations.forEach(async ({ name, address }) => {
    try {
      const location = await Location.create({
        name,
        address,
      });
      allLocations.push(location);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  res.status(200).json(allLocations);
};

//update location

// Update location
const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }

  try {
    const updatedLocation = await Location.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedLocation) {
      return res.status(404).json({ error: "No such location" });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete location
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such location" });
  }

  try {
    const deletedLocation = await Location.findByIdAndRemove(id);

    if (!deletedLocation) {
      return res.status(404).json({ error: "No such location" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLocation,
  creatBatch,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
