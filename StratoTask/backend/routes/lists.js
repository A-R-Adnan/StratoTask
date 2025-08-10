const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);

// Get all lists with tasks for this user
router.get("/", async (req, res) => {
  const uid = req.user.uid;
  try {
    const userRes = await pool.query("SELECT id FROM users WHERE firebase_uid=$1", [uid]);
    if (!userRes.rows.length) return res.json([]);
    const userId = userRes.rows[0].id;

    const listsRes = await pool.query(
      `SELECT l.id as list_id, l.name, t.id as task_id, t.title, t.status
       FROM lists l LEFT JOIN tasks t ON l.id = t.list_id WHERE l.user_id=$1
       ORDER BY l.id, t.id`, [userId]
    );

    const listsMap = {};
    listsRes.rows.forEach(row => {
      if (!listsMap[row.list_id]) {
        listsMap[row.list_id] = { id: row.list_id, name: row.name, tasks: [] };
      }
      if (row.task_id) {
        listsMap[row.list_id].tasks.push({ id: row.task_id, title: row.title, status: row.status });
      }
    });

    res.json(Object.values(listsMap));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new list
router.post("/", async (req, res) => {
  const { name } = req.body;
  const uid = req.user.uid;
  if (!name) return res.status(400).json({ error: "Name required" });
  try {
    let userRes = await pool.query("SELECT id FROM users WHERE firebase_uid=$1", [uid]);
    let userId;
    if (!userRes.rows.length) {
      const insertUser = await pool.query(
        "INSERT INTO users (firebase_uid) VALUES ($1) RETURNING id",
        [uid]
      );
      userId = insertUser.rows[0].id;
    } else {
      userId = userRes.rows[0].id;
    }
    const newList = await pool.query(
      "INSERT INTO lists (user_id, name) VALUES ($1, $2) RETURNING id, name",
      [userId, name]
    );
    res.json({ ...newList.rows[0], tasks: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Rename a list
router.put("/:listId", async (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  try {
    await pool.query("UPDATE lists SET name=$1 WHERE id=$2", [name, listId]);
    const updated = await pool.query("SELECT * FROM lists WHERE id=$1", [listId]);
    res.json(updated.rows[0]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a list
router.delete("/:listId", async (req, res) => {
  const { listId } = req.params;
  try {
    await pool.query("DELETE FROM lists WHERE id=$1", [listId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a task to a list
router.post("/:listId/tasks", async (req, res) => {
  const { listId } = req.params;
  const { title } = req.body;
  const uid = req.user.uid;
  if (!title) return res.status(400).json({ error: "Title required" });
  try {
    const userRes = await pool.query("SELECT id FROM users WHERE firebase_uid=$1", [uid]);
    if (!userRes.rows.length) return res.status(404).json({ error: "User not found" });
    const userId = userRes.rows[0].id;

    const insertTask = await pool.query(
      "INSERT INTO tasks (list_id, user_id, title) VALUES ($1, $2, $3) RETURNING id, title, status",
      [listId, userId, title]
    );
    res.json(insertTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update task (status or title)
router.put("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { status, title } = req.body;
  if (!status && !title) return res.status(400).json({ error: "Nothing to update" });

  try {
    const fields = [];
    const values = [];
    let idx = 1;

    if (status) {
      fields.push(`status = $${idx++}`);
      values.push(status);
    }
    if (title) {
      fields.push(`title = $${idx++}`);
      values.push(title);
    }
    values.push(taskId);

    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, title, status`;
    const updated = await pool.query(query, values);
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a task
router.delete("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id=$1", [taskId]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
