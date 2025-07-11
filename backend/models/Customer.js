const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    phoneMobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[0-9]{10}$/, // Ensures it's a 10-digit number
    },
    phone2: {
      type: String,
      trim: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/, // Basic email format
    },
    address: {
      type: String,
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
