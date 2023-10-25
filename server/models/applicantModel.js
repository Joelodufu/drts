const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicantSchema = new Schema(
  {
    //personal information
    fullName: {
      type: String,
    },
    dateofBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    nationality: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    nationalIDNumber: {
      type: String,
    },

    //Contact Information
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: false,
    },
    nextOfKinsAddress: {
      type: String,
    },
    proccessingCenter: {
      type: String,
    },
    licenseType: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    //Documents
    passport: {
      type: String,
    },
    legalID: {
      type: String,
    },
    proofOfAddress: {
      type: String,
    },
    eyeTestCeritificate: {
      type: String,
    },
    driversPermit: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("applicant", applicantSchema);
