const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    role: {
      type: String,
      enum: ["patient", "doctor", "helper"],
      default: "patient"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);