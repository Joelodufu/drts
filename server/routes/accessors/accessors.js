const express = require("express");
const path = require("path");

const accessorsController = require("../../controllers/accessorController");

const router = express.Router();

//get all accessors
router.get("/", accessorsController.getAccessors);

//Get Single accessor
router.get("/:id", accessorsController.getAccessor);

//POST a new accessor
router.post("/", accessorsController.createAccessor);

//Delete an accessor
router.delete("/:id", accessorsController.deleteAccessor);
//Update an accessor
router.patch("/:id", accessorsController.updateAccessor);

module.exports = router;
