const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accessorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    activStatus: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Accessor", accessorSchema);
