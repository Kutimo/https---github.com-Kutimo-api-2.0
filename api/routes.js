const express = require("express")
const router = express.Router();
const fs = require('fs');

const bookRoute = require("./bookRoute.js") // import book route
router.use(bookRoute) // use account route
module.exports = router;