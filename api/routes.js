const express = require("express")
const router = express.Router();
const fs = require('fs');

const bookRoute = require("./bookRoute") // import book route
router.use(bookRoute) // use book route
module.exports = router;