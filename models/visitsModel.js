const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    webSiteName: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    lastVisit: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
