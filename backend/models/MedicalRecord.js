const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patientPhone: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    age: Number,

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    doctorName: String,

    department: String,

    title: {
      type: String,
      required: true,
    },
    category: {
  type: String,
  default: "Prescription"
},
    diagnosis: String,

    medicines: [String],

    notes: String,
    fileUrl: String,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);