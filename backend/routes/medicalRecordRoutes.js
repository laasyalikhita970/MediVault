const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createRecord,
  getRecordsByPhone,
  updateRecord,
  deleteRecord,
  getRecordById
} = require("../controllers/medicalRecordController");

router.post(
  "/",
  protect,
  upload.single("file"),
  (req, res, next) => {
    console.log("POST /records hit");
    console.log(req.body);
    console.log(req.file);
    next();
  },
  createRecord
);

router.get("/details/:id", protect, getRecordById);

router.get("/:phone", protect, getRecordsByPhone);

router.put("/:id", protect, updateRecord);

router.delete("/:id", protect, deleteRecord);

module.exports = router;