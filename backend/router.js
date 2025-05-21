const express = require("express");
const db = require("./database/db");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM st");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/post", async (req, res) => {
  const { id, name, age } = req.body;

  try {
    const { rows, err } = await db.query(
      "INSERT INTO  st(id,name,age)VALUES($1,$2,$3) RETURNING *",
      [id, name, age]
    );
    if (rows) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json("fffffff");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
