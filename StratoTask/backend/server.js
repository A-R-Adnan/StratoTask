const express = require("express");
const cors = require("cors");
const listsRouter = require("./routes/lists");
const authRouter = require("./routes/auth");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",               // Local development
  "https://your-frontend.onrender.com"   // Production frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/lists", listsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
