const express = require("express");
const db = require("./database/db");
const multer = require("multer");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors({ origin: "http://localhost:3000" }));
router.use(express.static("public"));

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM st");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Use relative path, not absolute
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter });

router.post("/fileupload", upload.single("file"), async (req, res) => {
  try {
    const { name, age } = req.body;
    const { originalname, filename, mimetype, size } = req.file;

    const id = Math.floor(Math.random() * 1000) + 1;
    const { rows } = await db.query(
      "INSERT INTO student(id, name, age, originalname, filename, mimetype, size) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",
      [id, name, age, originalname, filename, mimetype, size]
    );
    res.status(201).json({
      message: "File uploaded successfully",
      file: rows[0],
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
});

router.post("post/:id", async (req, res) => {
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
  console.log(id, name, age);
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
