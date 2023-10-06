const Applicant = require("../models/applicantModel");
const mongoose = require("mongoose");
//gel all applicant
const getApplicants = async (req, res) => {
  const applicants = await Applicant.find({}).sort({ createdAt: -1 });

  res.status(200).json(applicants);
};
//get single applicant
const getApplicant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such applicant" });
  }

  const applicant = await Applicant.findById(id);

  if (!applicant) {
    return res.status(404).json({ error: "No Such applicant" });
  }

  res.status(200).json(applicant);
};

//create applicant
const createApplicant = async (req, res) => {
  const {
    fullName,
    dateofBirth,
    gender,
    nationality,
    bloodGroup,
    nationalIDNumber,
    address,
    phoneNumber,
    email,
    nextOfKinsAddress,
    proccessingCenter,
    licenseType,
    paymentMethod,
    passport,
    legalID,
    proofOfAddress,
    eyeTestCeritificate,
    driversPermit,
  } = req.body;

  //add to db
  try {
    const applicant = await Applicant.create({
      fullName,
      dateofBirth,
      gender,
      nationality,
      bloodGroup,
      nationalIDNumber,
      address,
      phoneNumber,
      email,
      nextOfKinsAddress,
      proccessingCenter,
      licenseType,
      paymentMethod,
      passport,
      legalID,
      proofOfAddress,
      eyeTestCeritificate,
      driversPermit,
    });
    res.status(200).json(applicant);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Create Batch

const creatBatch = (req, res) => {
  const allApplicants = [];
  const { applicants } = req.body;
  applicants.forEach(
    async ({
      fullName,
      dateofBirth,
      gender,
      nationality,
      bloodGroup,
      nationalIDNumber,
      address,
      phoneNumber,
      email,
      nextOfKinsAddress,
      proccessingCenter,
      licenseType,
      paymentMethod,
      passport,
      legalID,
      proofOfAddress,
      eyeTestCeritificate,
      driversPermit,
    }) => {
      try {
        const applicant = await Applicant.create({
          fullName,
          dateofBirth,
          gender,
          nationality,
          bloodGroup,
          nationalIDNumber,
          address,
          phoneNumber,
          email,
          nextOfKinsAddress,
          proccessingCenter,
          licenseType,
          paymentMethod,
          passport,
          legalID,
          proofOfAddress,
          eyeTestCeritificate,
          driversPermit,
        });
        allApplicants.push(applicant);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  res.status(200).json(allApplicants);
};

//update school

// Update school
const updateApplicant = async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    dateofBirth,
    gender,
    nationality,
    bloodGroup,
    nationalIDNumber,
    address,
    phoneNumber,
    email,
    nextOfKinsAddress,
    proccessingCenter,
    licenseType,
    paymentMethod,
    passport,
    legalID,
    proofOfAddress,
    eyeTestCeritificate,
    driversPermit,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Applicant" });
  }

  try {
    const updatedApplicant = await Applicant.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ error: "No such applicant" });
    }

    res.status(200).json(updatedApplicant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete school
const deleteApplicant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such applicant" });
  }

  try {
    const deletedApplicant = await Applicant.findByIdAndRemove(id);

    if (!deletedApplicant) {
      return res.status(404).json({ error: "No such applicant" });
    }

    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createApplicant,
  creatBatch,
  getApplicants,
  getApplicant,
  updateApplicant,
  deleteApplicant,
};
