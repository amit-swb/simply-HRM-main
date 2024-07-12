const mongoose = require("mongoose");
const bcriptjs = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  first_name: {
    type: "string",
  },

  last_name: {
    type: "string",
  },

  email_id: {
    type: "string",
    unique: true,
  },

  phone_number: {
    type: "string",
  },

  password: {
    type: "string",
  },

  user_type: {
    type: "string",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("users", UserSchema);
