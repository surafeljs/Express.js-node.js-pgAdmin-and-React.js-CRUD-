const express = require("express");
const router = require("./router");
const app = express();
app.use(router);

const port = 4000;

app.listen(port, (err) => {
  console.log(`server is runing http:// ${port}`);
});
