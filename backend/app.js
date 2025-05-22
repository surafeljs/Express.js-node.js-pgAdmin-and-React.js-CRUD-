const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
app.use(router);
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));
const port = 4000;

app.listen(port, (err) => {
  console.log(`server is runing http:// ${port}`);
});
