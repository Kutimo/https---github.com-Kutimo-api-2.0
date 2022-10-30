const express = require("express");
const app = express();
const db = require("./database.js");
const cors = require("cors");

const HTTP_PORT = 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/books", (req, res, next) => {
  var sql = "select * from books";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/books/:id", (req, res, next) => {
  var sql = "select * from books where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.post("/api/books/", (req, res, next) => {
  var errors = [];
  if (!req.body.isbn) {
    errors.push("No isbn specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    name: req.body.name,
    email: req.body.email,
    isbn: req.body.isbn,
  };
  var sql = "INSERT INTO books (name, email, isbn) VALUES (?,?,?)";
  var params = [data.name, data.email, data.isbn];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.patch("/api/books/:id", (req, res, next) => {
  var data = {
    name: req.body.name,
    email: req.body.email,
    isbn: req.body.isbn,
  };
  db.run(
    `UPDATE books set 
         name = COALESCE(?,name), 
         email = COALESCE(?,email), 
         isbn = COALESCE(?,isbn) 
         WHERE id = ?`,
    [data.name, data.email, data.isbn, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

app.delete("/api/books/:id", (req, res, next) => {
  db.run("DELETE FROM books WHERE id = ?", req.params.id, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
