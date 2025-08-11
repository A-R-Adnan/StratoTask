// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const listsRouter = require("./routes/lists");
const authRouter = require("./routes/auth");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Local development frontend
  "https://stratotask.onrender.com" // Production frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow Authorization header
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/lists", listsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
