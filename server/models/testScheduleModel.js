const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testScheduleSchema = new Schema(
  {
    applicantId: {
      //applicantID
      type: String,
      required: true,
    },
    user: {
      //applicantID
      type: String,
      required: true,
    },
    date: {
      //date of the test
      type: String,
      required: true,
    },
    time: {
      //time of the test
      type: String,
      required: true,
    },
    location: {
      //location of the test
      type: String,
      required: true,
    },
    accessorId: {
      //id of the accessor
      type: String,
      required: true,
    },
    testStatus: {
      //awaiting, passed, failed, missed
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TestSchedule", testScheduleSchema);
