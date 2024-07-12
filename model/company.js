const mongoose = require("mongoose");
const bcriptjs = require("bcryptjs");
const CompanySchema = new mongoose.Schema({
  company_name: {
    type: "string",
  },
  company_id: {
    type: "string",
  },
  email_id: {
    type: "string",
    unique: true,
  },
  password: {
    type: "string",
  },
  company_website_url: {
    type: "string",
  },
  Company_logo: {
    type: "string",
  },
  country: {
    type: "string",
  },
  industry_business_location: {
    type: "string",
  },
  company_address: {
    type: "string",
  },
  city: {
    type: "string",
  },
  zip_code: {
    type: "string",
  },
  mobile_number: {
    type: "string",
  },
  phone_number: {
    type: "string",
  },
  contact_person: {
    type: "string",
  },
  time_zone: {
    type: "string",
  },
  date_format: {
    type: "string",
  },
  company_number: {
    type: "string",
  },
  company_tax_id: {
    type: "string",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
CompanySchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hased = await bcriptjs.hash(this.password, 10);
    this.password = hased;

    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("company", CompanySchema);
