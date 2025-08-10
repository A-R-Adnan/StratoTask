const express = require("express");
const pool = require("../db");
const router = express.Router();

// Sync Firebase user to DB (call after every new signup)
router.post("/sync-user", async (req, res) => {
  const { firebase_uid, email, display_name } = req.body;
  if (!firebase_uid || !email) return res.status(400).json({ error: "Missing fields" });
  try {
    await pool.query(
      `INSERT INTO users (firebase_uid, email, display_name)
       VALUES ($1, $2, $3)
       ON CONFLICT (firebase_uid) DO UPDATE SET email=$2, display_name=$3`,
      [firebase_uid, email, display_name]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
