const express = require("express")
const router = express.Router()
const ApiController = require("./controller")
const validation = require("./validation")
const { upload } = require("../utils/multer")
const { validate } = require("../utils/validate")

router.get("/posts", ApiController.index )
router.post("/post", upload.single("image"), validate(validation.create), ApiController.create)
router.get("/post/:id", validate(validation.post, "params"), ApiController.post)
router.put("/post/edit/:id", validate(validation.update, "params"), upload.single("image"), ApiController.update)
router.delete("/post/delete/:id", validate(validation.deletePost, "params"), ApiController.delete)

module.exports = router