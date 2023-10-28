const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
} = require("../../controllers/usersController");

const router = express.Router();

//get all Users
router.get("/", getUsers);

//Get Single User
router.get("/:id", getUser);

//Delete an User
router.delete("/:id", deleteUser);

module.exports = router;
