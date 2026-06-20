const express = require("express");
const router = express.Router();
const authorize = require(
  "../middleware/roleMiddleware"
);
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
  authorize("patient", "helper"),
  upload.single("file"),
  createRecord
);

router.get(
  "/details/:id",
  protect,
  authorize(
    "patient",
    "helper",
    "doctor"
  ),
  getRecordById
);

router.get(
  "/:phone",
  protect,
  authorize(
    "patient",
    "helper",
    "doctor"
  ),
  getRecordsByPhone
);

router.put(
  "/:id",
  protect,
  authorize(
    "patient",
    "helper",
    "doctor"
  ),
  upload.single("file"),
  updateRecord
);

router.delete(
  "/:id",
  protect,
  authorize("patient"),
  deleteRecord
);

module.exports = router;