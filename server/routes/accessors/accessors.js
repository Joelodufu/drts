const express = require("express");
const path = require("path");

const {
  createAccessor,
  creatBatch,
  getAccessors,
  getAccessor,
  updateAccessor,
  deleteAccessor,
} = require("../../controllers/accessorController");

const router = express.Router();

//get all accessors
router.get("/", getAccessors);

//Get Single accessor
router.get("/:id", getAccessor);

//POST a new accessor
router.post("/", createAccessor);

//Post Batch Accessors

router.post("/batch", creatBatch);

//Delete an accessor
router.delete("/:id", deleteAccessor);
//Update an accessor
router.patch("/:id", updateAccessor);

module.exports = router;
