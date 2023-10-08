const User = require("../models/userModel");
const mongoose = require("mongoose");
//gel all user
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};
//get single user
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No Such user" });
  }

  res.status(200).json(user);
};

//create user
const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  //add to db
  try {
    const user = await User.create({
      fullName,
      email,
      password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Create Batch

const creatBatch = (req, res) => {
  const allUsers = [];
  const { users } = req.body;
  users.forEach(async ({ fullName, email, password }) => {
    try {
      const user = await User.create({
        fullName,
        email,
        password,
      });
      allUsers.push(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  res.status(200).json(allUsers);
};

//update school

// Update school
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete school
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  creatBatch,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
