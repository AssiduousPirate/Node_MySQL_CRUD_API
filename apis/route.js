const express = require("express")
const router = express.Router()
const ApiController = require("./controller")
const middlewares = require("./middleware")

router.get("/page", middlewares.index, ApiController.index )

module.exports = router