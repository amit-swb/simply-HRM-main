const mongoose = require("mongoose");
const HolidaySchema = new mongoose.Schema({
  holiday_name: {
    type: "string",
  },
  date: {
    type: "string",
  },
  day: {
    type: "string",
  },
  company_id: {
    type: "string",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("holiday", HolidaySchema);
