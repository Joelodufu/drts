const express = require("express");
const path = require("path");

const {
  createLocation,
  creatBatch,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("../../controllers/locationController");


const router = express.Router();

//get all location
router.get("/", getLocations);

//Get Single Location
router.get("/:id", getLocation);

//POST a new Location
router.post("/", createLocation);

//Post Batch

router.post("/batch", creatBatch);

//Delete a new Location
router.delete("/:id", deleteLocation);
//Update a new Location
router.patch("/:id", updateLocation);

module.exports = router;
