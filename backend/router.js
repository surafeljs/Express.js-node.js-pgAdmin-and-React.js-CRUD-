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
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM st WHERE name=$1", [id]);
    if (rows.length === 0) {
      res.send("user not found");
    }
    if (rows) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json(err.message);
    }
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
      res.status(404).json(err.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, err } = await db.query(
      "DELETE FROM st WHERE id=$1 RETURNING *",
      [id]
    );
    if (rows.length === 0) {
      res.send("user not found");
    }
    if (rows) {
      res.status(200).json({
        message: "deleted",
        status: rows[0],
      });
    } else {
      res.status(404).json(err.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { rows, err } = await db.query(
      "UPDATE st SET name=$1 WHERE id=$2 RETURNING *",
      [name, id]
    );
    if (rows.length === 0) {
      res.send("user not found");
    }
    if (rows) {
      res.status(200).json({
        message: "updated",
        status: rows[0],
      });
    } else {
      res.status(404).json(err.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
