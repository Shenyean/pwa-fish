const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "newschema",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!2");
});
module.exports = db;
