const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const medicalRecordRoutes = require(
  "./routes/medicalRecordRoutes"
);
const path = require("path");
dotenv.config();

const app = express();

// middleware
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("🚀 MediVault Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});

app.use(
  "/api/records",
  medicalRecordRoutes
);