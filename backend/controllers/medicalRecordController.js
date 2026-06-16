const MedicalRecord = require("../models/MedicalRecord");

const createRecord = async (req, res) => {
  try {
    console.log("Inside createRecord");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const record = await MedicalRecord.create({
      patientPhone: req.body.patientPhone,
      patientName: req.body.patientName,
      title: req.body.title,
      description: req.body.description,

      doctorName: req.body.doctorName,
      department: req.body.department,
      diagnosis: req.body.diagnosis,
      medicines: req.body.medicines,
      notes: req.body.notes,

      fileUrl: req.file
        ? `/uploads/${req.file.filename}`
        : "",

      uploadedBy: req.user.id,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("CREATE RECORD ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecordsByPhone = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patientPhone: req.params.phone,
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const updateData = {
      patientPhone: req.body.patientPhone,
      patientName: req.body.patientName,
      title: req.body.title,
      diagnosis: req.body.diagnosis,
    };

    if (req.file) {
      updateData.fileUrl =
        `/uploads/${req.file.filename}`;
    }

    const record =
      await MedicalRecord.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(
      req.params.id
    );

    if (!record) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    res.json({
      message: "Record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(
      req.params.id
    );

    if (!record) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createRecord,
  getRecordsByPhone,
  updateRecord,
  deleteRecord,
  getRecordById
};