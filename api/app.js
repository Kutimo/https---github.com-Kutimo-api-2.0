const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');


const app = express();
const port = 3000;

//configure body parser middleware

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
const routes = require('./routes.js')
app.use('/', routes)

//post book data to json

app.post('/book', (req, res,) => {
  const book = req.body;

console.log(book);
book.push(book);

return res.send('Book is added to the database');
});

app.get ('/books', (req, res) => {
    return res.send("get");
});

app.put('/books', (req, res) => { 
  return res.send('put');
});

app.delete('/books', (req, res) => {
    return res.send('delete'); 
});


app.listen(port, () => console.log(`listening on ${port}!`)
);
