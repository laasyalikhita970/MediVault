const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createRecord,
  getRecordsByPhone,
  updateRecord,
  deleteRecord,
  getRecordById
} = require("../controllers/medicalRecordController");

router.post("/", protect, createRecord);

router.get("/details/:id", protect, getRecordById);

router.get("/:phone", protect, getRecordsByPhone);

router.put("/:id", protect, updateRecord);

router.delete("/:id", protect, deleteRecord);

module.exports = router;