const express = require("express");
const db = require("./Config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3306;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM fishuser", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log("success");
  });
});
