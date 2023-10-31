const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../../controllers/usersController");

const router = express.Router();

//get all Users
router.get("/", getUsers);

//Get Single User
router.get("/:id", getUser);
router.patch("/:id", updateUser);

//Delete an User
router.delete("/:id", deleteUser);

module.exports = router;
