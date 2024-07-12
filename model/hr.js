const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
var AutoIncrement = require("mongoose-sequence")(mongoose);
const HRschema = new mongoose.Schema({
  first_Name: {
    type: "string",
  },
  middle_Name: {
    type: "string",
  },
  last_name: {
    type: "string",
  },
  date_of_birth: {
    type: "string",
  },
  email_id: {
    type: "string",
  },
  password: {
    type: "string",
  },
  mobile_number: {
    type: "string",
  },
  alternate_number: {
    type: "string",
  },
  father_number: {
    type: "string",
  },
  current_address: {
    type: "string",
  },
  permanent_address: {
    type: "string",
  },
  designation: {
    type: "string",
  },
  date_of_joining: {
    type: "string",
  },
  pancard: {
    type: "string",
  },
  ID_number: {
    type: "string",
  },
  bank_name: {
    type: "string",
  },
  bank_account: {
    type: "string",
  },
  number_bank: {
    type: "string",
  },
  IFSC_code: {
    type: "string",
  },
  upload_Document: {
    type: "string",
  },
  hr_image: {
    type: "string",
  },
  user_type: {
    type: "string",
  },
  company_id: {
    type: "string",
  },
  company_name: {
    type: "string",
  },
  hr_id: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
HRschema.plugin(AutoIncrement, {
  id: "hr_seq",
  inc_field: "hr_id",
  reference_fields: ["company_id"],
});
HRschema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hased = await bcryptjs.hash(this.password, 10);
    this.password = hased;
    return next();
  } catch (err) {
    return next(err);
  }
});
module.exports = mongoose.model("Hr", HRschema);
