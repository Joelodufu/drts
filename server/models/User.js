const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    require: true,
    unique:true
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"], // Add other roles as needed
    default: "user", // Default role is 'user'
  },
});

module.exports = mongoose.model("User", userSchema);
