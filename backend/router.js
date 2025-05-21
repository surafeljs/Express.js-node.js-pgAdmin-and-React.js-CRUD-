const express = require("express");
const db = require("./database/db");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM st");
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
