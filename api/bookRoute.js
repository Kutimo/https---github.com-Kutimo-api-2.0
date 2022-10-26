const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");

module.exports = bookRoute;

const dataPath = "./book.json";

const saveBookData = (data) => {
  const stringify = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getBookData = (data) => {
  const json = fs.readFileSync(dataPath);
  return json.parse(jsonData);
};

bookRoute.post("/books/add", (req, res) => {
  var existBooks = getBookData();
  const newBookId = math.floor(100 + math.random() * 100);

  existBook[newBookId] = req.body;

  console.log(existBook);
  saveBookData(existBook);
  res.send({ success: true, msg: "book added successfully" });
});
