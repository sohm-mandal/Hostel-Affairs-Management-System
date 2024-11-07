const { Double } = require("mongodb");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    reg_no: {
      type: String,
    },
    mess: {
      type: String,
    },
    hobies: {
      type: Array,
    },
    state:{
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
