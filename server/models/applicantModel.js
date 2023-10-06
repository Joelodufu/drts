const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicantSchema = new Schema(
  {
    //personal information
    fullName: {
      type: String,
      required: true,
    },
    dateofBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    nationalIDNumber: {
      type: String,
      required: true,
    },

    //Contact Information
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    nextOfKinsAddress: {
      type: String,
      required: true,
    },
    proccessingCenter: {
      type: String,
      required: true,
    },
    licenseType: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    //Documents
    passport: {
      type: String,
      required: true,
    },
    legalID: {
      type: String,
      required: true,
    },
    proofOfAddress: {
      type: String,
      required: true,
    },
    eyeTestCeritificate: {
      type: String,
      required: true,
    },
    driversPermit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("applicant", applicantSchema);
