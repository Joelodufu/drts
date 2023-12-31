const User = require("../models/User");
const mongoose = require("mongoose");
//gel all User
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};
//get single User
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such User" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No Such User" });
  }

  res.status(200).json(user);
};



const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastNams, email, role } = req.body;

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

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  try {
    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "No such User" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  updateUser,
  getUser,
  deleteUser,
};
