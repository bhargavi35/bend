const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is mandatory"]
    },
    email: {
      type: String,
      required: [true, "email is mandatory"],
    },
    password: {
      type: String,
      minLength: [8, "password can't be less than 8 characters"],
      required: [true, "pasword is mandatory"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = new mongoose.model("user", userSchema);